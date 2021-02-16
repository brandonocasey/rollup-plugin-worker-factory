// used to make nodejs workers behave like the browser
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
const getWorker = new Function('req', 'return req("worker_threads").Worker;');

export const factory = function(code) {
  return function() {
    const Worker = getWorker(require);

    return nodeWorkerPolyfill(new Worker(code, {eval: true}));
  };
};

export const transform = function(code) {
  return `const nodeWorkerPolyfill = ${nodeWorkerPolyfill.toString()};\n` +
    'global.self = nodeWorkerPolyfill(require("worker_threads").parentPort);\n' +
    code;
};

