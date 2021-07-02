class MockWorker {
  constructor() {
    this.listeners_ = [];
    this.onmessage = null;
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

  dispatchEvent(event) {
    if (!event || event.type !== 'message') {
      return;
    }

    if (this.onmessage) {
      this.onmessage(event);
    }
    this.listeners_.forEach(function(fn) {
      fn(event);
    });
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
    if (this.remote_) {
      this.remote_.remote_ = null;
      this.remote_.terminate();
      this.remote_ = null;
    }
    this.onmessage = null;
    this.listeners_.length = 0;
  }
}

MockWorker.prototype.on = MockWorker.prototype.addEventListener;
MockWorker.prototype.off = MockWorker.prototype.removeEventListener;

export const factory = function(fn) {
  return function() {
    const client = new MockWorker();
    const worker = new MockWorker();

    client.type_ = 'window api';
    client.remote_ = worker;
    worker.remote_ = client;
    worker.type_ = 'web worker';

    fn(worker);

    return client;
  };
};

export const transform = function(fn) {
  // eslint-disable-next-line
  return fn;
};

