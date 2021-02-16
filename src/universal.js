import * as node from './node.js';
import * as browser from './browser.js';
import * as mock from './mock.js';

const nodeSupport = (function() {
  try {
    const worker = require('worker_threads');

    if (typeof worker !== 'undefined') {
      return true;
    }
  } catch (e) {
    return false;
  }

})();

const browserSupport = (function() {
  try {
    // eslint-disable-next-line
    const test = window && window.Worker;

    if (typeof test !== 'undefined') {
      return true;
    }
  } catch (e) {
    // ignore
    return false;
  }
})();

let universal = mock;

if (nodeSupport) {
  universal = node;
} else if (browserSupport) {
  universal = browser;
}

export const transform = universal.transform;
export const factory = universal.factory;
