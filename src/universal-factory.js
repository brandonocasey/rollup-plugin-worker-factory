/* global process */
/* eslint-disable no-console */
import nodeFactory from './node-factory.js';
import browserFactory from './browser-factory.js';

let nodeVersion;

try {
  nodeVersion = process && process.versions && process.versions.node;
} catch (e) {
  // not node
}
let workerFactory;

if (nodeVersion) {
  workerFactory = nodeFactory;
} else {
  workerFactory = browserFactory;
}

export default workerFactory;
