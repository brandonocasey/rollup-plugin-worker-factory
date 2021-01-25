<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Install](#install)
- [Requirements](#requirements)
- [Usage](#usage)
- [How it works](#how-it-works)
- [Modifications to node worker_threads](#modifications-to-node-worker_threads)
- [Modifictaion to browser WebWorkers](#modifictaion-to-browser-webworkers)
- [Options](#options)
  - [plugins](#plugins)
  - [type](#type)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Install
```sh
npm i -D rollup-plugin-worker-factory
```

## Requirements
* browsers with web worker support (tested in ie 11)
* nodejs >= 10 when node is run with `--experimental-workers`
* natively in nodejs >= 12 without any arguments to node

## Usage
include rollup-plugin-worker-factory in your rollup plugins array for a build:
```js
const worker = require('rollup-plugin-worker-factory');

...
plugins: [
  worker()
]
...
```

When you want to include a worker in your code prefix the file with `worker!`:
```js
import SomeWorker from "worker!./src/some-worker.js";
```

Your worker should run without exporting any code and use the global `self` variable to interact with the worker API. `worker_threads.parentPort` for node has been slightly modified so that their API more closely matches web workers in the browser and will also be available on the global `self`.

```js
const someDependency = require('../some-dep');
const whoKnows = require('who-knows');

self.addEventListener('message', function(e) {
  const foo = someDependency(e);

  self.postMessage(whoKnows(foo));
});
```

## How it works
1. We use rollup to rollup all dependencies for your web worker file into a bundle.
2. We wrap that rollup in a function so that it can be minified and included normally in your code without doing anything.
3. We return a web worker constructor for your function that will run in the web worker with slight modifications to unify the API (nothing that you, the user should have to worky about).


## Modifications to node worker_threads
* We mirror `on` to `addEventListener` on worker objects
* We mirror `off` to `removeEventListener` on worker objects
* We wrap `postMessage` so that the message sent is included as a value for a `data` key on an object as this is how the browser works with postMessage.

## Modifictaion to browser WebWorkers
* We automagically create a blob url of your code to run in the worker that will be revoked on worker terminate
* We mirror `addEventListener` to `on` on worker objects
* We mirror `removeEventListener` to `on` on worker objects
* We add the created blob url to the worker as an `objURL` property

## Options
### plugins
An array of rollup plugins to bundle the web workers with, you will probably want:

### type
> Default: 'universal'

The type of factory to build, can be 'node', 'mock', 'browser', or 'universal'.
* browser will only work in the browser
* node will only work in node
* mock will work everywhere but runs on the same thread
* universal will work on the browser or node depending on available apis


* [@rollup/plugin-node-resolve](https://www.npmjs.com/package/@rollup/plugin-node-resolve)
* [@rollup/plugin-json](https://www.npmjs.com/package/@rollup/plugin-json)
* [@rollup/plugin-commonjs](https://www.npmjs.com/package/@rollup/plugin-commonjs)
