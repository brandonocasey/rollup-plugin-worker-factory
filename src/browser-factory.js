import getWorkerString from './get-worker-string.js';
/* global Blob, BlobBuilder Worker */

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

const workerFactory = function(workerFunction) {
  const code = `const browserWorkerPolyFill = ${browserWorkerPolyFill.toString()};\n` +
    'self = browserWorkerPolyFill(self);\n' +
    getWorkerString(workerFunction);

  return function() {
    const objectUrl = createObjectURL(code);
    const worker = new Worker(objectUrl);

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

export default workerFactory;
