// used to make nodejs workers behave like the browser
const nodeWorkerPolyfill = function(workerObj, EventEmitter) {

  const oldPost = workerObj.postMessage;

  // the browser puts the actual message under
  // the data key, we need to mimic that
  workerObj.postMessage = function(data, transfer) {
    return oldPost.call(this, {data}, transfer);
  };

  // if workerObj is an instance of EventEmitter then
  // we only need to mirror on/off as addEventListener/removeEventListener
  // this is always the case for Worker but only the case for
  // parentPort in node 10/12
  if (workerObj instanceof EventEmitter) {
    workerObj.addEventListener = workerObj.on;
    workerObj.removeEventListener = workerObj.off;

  // in node >= 14 parentPort extents EventTarget
  // https://github.com/nodejs/node/issues/35835
  // and we need to do a carefull polyfill to make
  // the builtin addEventListener call on so that
  // the message callback works as expected.
  } else {
    const old = {
      addEventListener: workerObj.addEventListener
    };
    const polyfill = function(type, fn, options) {
      // set addEventListener to the builtin function
      // as `on` is called with a special symbol `kIsNodeStyleListener`
      // to indicate that it part of MessagePort and
      // should function between the sender/receiver.
      workerObj.addEventListener = old.addEventListener;

      const retval = workerObj.on(type, fn);

      // set back to polyfill after the call so that
      // user calls to this function always come here
      // and set `kIsNodeStyleListener`
      workerObj.addEventListener = polyfill;
      return retval;
    };

    workerObj.addEventListener = polyfill;

  }

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
// eslint-disable-next-line
const getEventEmitter = new Function('req', 'return req("events").EventEmitter;');

export const factory = function(code) {
  return function() {
    const Worker = getWorker(require);
    const worker_ = new Worker(code, {eval: true});

    worker_.on('error', function(e) {
      throw e;
    });

    return nodeWorkerPolyfill(worker_, getEventEmitter(require));
  };
};

export const transform = function(code) {
  return `const nodeWorkerPolyfill = ${nodeWorkerPolyfill.toString()};\n` +
    'global.self = nodeWorkerPolyfill(require("worker_threads").parentPort, require("events").EventEmitter);\n' +
    code;
};

