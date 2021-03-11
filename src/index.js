const rollup = require('rollup');
const fs = require('fs');
const path = require('path');
const universal = 'rollup-plugin-worker-factory/src/universal.js';
const node = 'rollup-plugin-worker-factory/src/node.js';
const browser = 'rollup-plugin-worker-factory/src/browser.js';
const mock = 'rollup-plugin-worker-factory/src/mock.js';
const getWorkerString = fs.readFileSync(path.join(__dirname, 'get-worker-string.js'), 'utf8');

module.exports = function(options) {
  const cache = {};

  return {
    name: 'workerFactory',
    resolveId(importee, importer) {
      if (importee === 'rollup-plugin-worker-factory/src/get-worker-string') {
        return importee + '.js';
      }
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
      if (id === 'rollup-plugin-worker-factory/src/get-worker-string.js') {
        return getWorkerString;
      }
      if (id.indexOf('worker!') !== 0) {
        return null;
      }
      const input = id.split('!')[1];

      let factoryPath = universal;

      if (options && options.type === 'mock') {
        factoryPath = mock;
      } else if (options && options.type === 'browser') {
        factoryPath = browser;
      } else if (options && options.type === 'node') {
        factoryPath = node;
      }

      const inputOptions = {
        input,
        plugins: options.plugins || [],
        cache: cache[id],
        onwarn: this.warn,
        external: [
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
        let workerCode;

        // mock worker does not use a string, it uses a
        // real function
        if (factoryPath !== mock) {
          workerCode = `getWorkerString(function() {\n${code}\n})`;
        } else {
          workerCode = `function(self) {\n${code}\n}`;

        }

        const newCode = '' +
          `/* rollup-plugin-worker-factory start for ${id} */\n` +
          `import {transform, factory} from "${factoryPath}";\n` +
          'import getWorkerString from "rollup-plugin-worker-factory/src/get-worker-string";\n' +
          `const workerCode = transform(${workerCode});\n` +
          'export default factory(workerCode);\n' +
          `/* rollup-plugin-worker-factory end for ${id} */\n`;

        return Promise.resolve(newCode);
      });
    }
  };
};
