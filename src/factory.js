/* global window, process */
let nodeVersion;

try {
  nodeVersion = process && process.versions && process.versions.node;
} catch (e) {
  // not node
}
let workerFactory;

const getWorkerString = function(fn) {
  return fn.toString().replace(/^function.+?{/, '').slice(0, -1);
};

if (nodeVersion) {
  // used to make nodejs workers behave like
  const nodeWorkerPolyfill = function(workerObj) {
    const oldPost = workerObj.postMessage;

    // the browser puts the actual message under
    // the data key, we need to mimic that
    workerObj.postMessage = function(data, transfer) {
      return oldPost.call(this, {data}, transfer);
    };
    // the browser only supports addEventListener/removeEventListener
    workerObj.addEventListener = workerObj.on;
    workerObj.removeEventListener = workerObj.off;

    return workerObj;
  };

  const Worker = require('worker_threads').Worker;

  workerFactory = function(workerFunction) {
    // make worker_threads more like web workers
    const code = `const nodeWorkerPolyfill = ${nodeWorkerPolyfill.toString()};\n` +
      "global.self = nodeWorkerPolyfill(require('worker_threads').parentPort);\n" +
      getWorkerString(workerFunction);

    return () => nodeWorkerPolyfill(new Worker(code, {eval: true}));
  };
} else {
  const browserWorkerPolyFill = function(workerObj) {
    // node only supports on/off
    workerObj.on = workerObj.addEventListener;
    workerObj.off = workerObj.removeEventListener;

    return workerObj;
  };
  const createObjectURL = function(str) {
    try {
      return URL.createObjectURL(new window.Blob([str], {type: 'application/javascript'}));
    } catch (e) {
      const blob = new window.BlobBuilder();

      blob.append(str);

      return URL.createObjectURL(blob.getBlob());
    }
  };

  workerFactory = function(workerFunction) {
    const code = `const browserWorkerPolyFill = ${browserWorkerPolyFill.toString()};\n` +
      'self = browserWorkerPolyFill(self);\n' +
      getWorkerString(workerFunction);

    return function() {
      const objectUrl = createObjectURL(code);
      const worker = new window.Worker(objectUrl);

      worker.objURL = objectUrl;
      const terminate = worker.terminate;

      worker.on = worker.addEventListener;
      worker.off = worker.removeEventListener;

      worker.terminate = function() {
        URL.revokeObjectURL(objectUrl);
        return terminate.call(this);
      };

      return worker;
    };
  };
}

export default workerFactory;
