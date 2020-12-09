const rollup = require('rollup');
const path = require('path');
const factoryPath = path.join(__dirname, 'factory.js');

module.exports = function(options) {
  const cache = {};

  return {
    name: 'workerFactory',
    resolveId(importee, importer) {
      // if this is not an id we can resolve return
      if (importee.indexOf('worker!') !== 0) {
        return;
      }

      const workerpath = importee.split('!')[1];
      const fullpath = path.resolve(path.dirname(importer), workerpath);

      this.addWatchFile(fullpath);

      return `worker!${fullpath}`;
    },
    load(id) {
      if (id.indexOf('worker!') !== 0) {
        return null;
      }
      const input = id.split('!')[1];

      const inputOptions = {
        input,
        plugins: options.plugins || [],
        cache: cache[id],
        onwarn: this.warn,
        external: [factoryPath, 'worker_threads', 'tiny-worker']
      };

      const outputOptions = {
        name: 'workerFactory',
        format: 'cjs',
        file: 'bundle-worker'
      };

      return rollup.rollup(inputOptions).then((bundle) => {
        bundle.watchFiles.forEach((file) => this.addWatchFile(file));
        cache[id] = bundle.cache;
        return bundle.generate(outputOptions);
      }).then(({output}) => {
        const code = output[0].code;

        return Promise.resolve(`import workerFactory from "${factoryPath}";\n` +
          'const workerFunction = function() {\n' +
          code +
          '}\n' +
          'export default workerFactory(workerFunction);');
      });
    }
  };
};
