/* global Blob, BlobBuilder, Worker */

// unify worker interface
const browserWorkerPolyFill = function(workerObj) {
  // node only supports on/off
  workerObj.on = workerObj.addEventListener;
  workerObj.off = workerObj.removeEventListener;

  return workerObj;
};

const createObjectURL = function(str) {
  try {
    return URL.createObjectURL(new Blob([str], {type: 'application/javascript'}));
  } catch (e) {
    const blob = new BlobBuilder();

    blob.append(str);

    return URL.createObjectURL(blob.getBlob());
  }
};

export const factory = function(code) {
  return function() {
    const objectUrl = createObjectURL(code);
    const worker = browserWorkerPolyFill(new Worker(objectUrl));

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

export const transform = function(code) {
  return `var browserWorkerPolyFill = ${browserWorkerPolyFill.toString()};\n` +
    'browserWorkerPolyFill(self);\n' +
    code;
};

