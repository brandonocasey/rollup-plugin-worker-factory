class FakeWorker {
  constructor() {
    this.listeners_ = [];
    this.remote_ = null;
  }
  addEventListener(type, fn) {
    if (type !== 'message') {
      return;
    }
    this.listeners_.push(fn);
  }
  removeEventListener(type, fn) {
    if (type !== 'message') {
      return;
    }

    const i = this.listeners_.indexOf(fn);

    if (i === -1) {
      return;
    }

    this.listeners_.splice(i, 1);
  }

  postMessage(data) {
    if (this.remote_) {
      this.remote_.recv_(data);
    }
  }

  recv_(data) {
    // the browser puts the actual message under
    const message = {data};

    if (this.onmessage) {
      this.onmessage(message);
    }
    this.listeners_.forEach(function(fn) {
      fn(message);
    });
  }

  terminate() {
    this.listeners_.length = 0;
  }
}

FakeWorker.prototype.on = FakeWorker.prototype.addEventListener;
FakeWorker.prototype.off = FakeWorker.prototype.removeEventListener;

export const factory = function(fn) {
  return () => {
    const client = new FakeWorker();
    const worker = new FakeWorker();

    client.remote_ = worker;
    worker.remote_ = client;

    fn(worker);

    return client;
  };
};

export const transform = function(code) {
  // eslint-disable-next-line
  return new Function('self', code);
};

