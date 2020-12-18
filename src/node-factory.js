import getWorkerString from './get-worker-string.js';

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
/**
 * We use new Function here for a few reasons
 * 1. It prevents bundlers from trying to bundle worker_threads
 *    this code only runs on nodejs, so it should never be bundled.
 * 2. eval performs waaay worse and most bundlers throw an error when using it.
 **/
// eslint-disable-next-line

const workerFactory = function(workerFunction) {
  const Worker = require('worker_threads').Worker;

  // make worker_threads more like web workers
  const code = `const nodeWorkerPolyfill = ${nodeWorkerPolyfill.toString()};\n` +
    "global.self = nodeWorkerPolyfill(require('worker_threads').parentPort);\n" +
    getWorkerString(workerFunction);

  return () => nodeWorkerPolyfill(new Worker(code, {eval: true}));
};

export default workerFactory;
