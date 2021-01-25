const rollup = require('rollup');
const path = require('path');
const universalFactory = 'rollup-plugin-worker-factory/src/universal-factory.js';
const nodeFactory = 'rollup-plugin-worker-factory/src/node-factory.js';
const browserFactory = 'rollup-plugin-worker-factory/src/browser-factory.js';
const getWorkerString = 'rollup-plugin-worker-factory/src/get-worker-string.js';
const mockFactory = 'rollup-plugin-worker-factory/src/mock-factory.js';

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

      let factoryPath = universalFactory;

      if (options && options.type === 'mock') {
        factoryPath = mockFactory;
      } else if (options && options.type === 'browser') {
        factoryPath = browserFactory;
      } else if (options && options.type === 'node') {
        factoryPath = nodeFactory;
      }

      const inputOptions = {
        input,
        plugins: options.plugins || [],
        cache: cache[id],
        onwarn: this.warn,
        external: [
          browserFactory,
          universalFactory,
          nodeFactory,
          mockFactory,
          getWorkerString,
          'worker_threads'
        ]
      };

      const outputOptions = {
        format: 'cjs'
      };

      return rollup.rollup(inputOptions).then((bundle) => {
        bundle.watchFiles.forEach((file) => this.addWatchFile(file));
        cache[id] = bundle.cache;
        return bundle.generate(outputOptions);
      }).then(({output}) => {
        const code = output[0].code;

        return Promise.resolve(`import workerFactory from "${factoryPath}";\n` +
          `/* rollup-plugin-worker-factory start for ${id} */\n` +
          'const workerFunction = function() {\n' +
          code +
          '}\n' +
          `/* rollup-plugin-worker-factory end for ${id} */\n` +
          'export default workerFactory(workerFunction);');
      });
    }
  };
};
