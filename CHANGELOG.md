<a name="0.5.7"></a>
## [0.5.7](https://github.com/brandonocasey/rollup-plugin-worker-factory/compare/v0.5.6...v0.5.7) (2021-07-02)

### Bug Fixes

* mock worker dispatchEvent should use onmessage, add type_ debugging aide ([3afd219](https://github.com/brandonocasey/rollup-plugin-worker-factory/commit/3afd219))

<a name="0.5.6"></a>
## [0.5.6](https://github.com/brandonocasey/rollup-plugin-worker-factory/compare/v0.5.5...v0.5.6) (2021-06-24)

### Bug Fixes

* slight parentPort API change workaround for node >= 14 ([31d3902](https://github.com/brandonocasey/rollup-plugin-worker-factory/commit/31d3902))

<a name="0.5.5"></a>
## [0.5.5](https://github.com/brandonocasey/rollup-plugin-worker-factory/compare/v0.5.4...v0.5.5) (2021-04-09)

### Bug Fixes

* support dispatchEvent on mock worker. Rename FakeWorker to MockWorker ([0050391](https://github.com/brandonocasey/rollup-plugin-worker-factory/commit/0050391))

<a name="0.5.4"></a>
## [0.5.4](https://github.com/brandonocasey/rollup-plugin-worker-factory/compare/v0.5.3...v0.5.4) (2021-03-11)

### Bug Fixes

* do not break uglify ([d282fcc](https://github.com/brandonocasey/rollup-plugin-worker-factory/commit/d282fcc))

<a name="0.5.3"></a>
## [0.5.3](https://github.com/brandonocasey/rollup-plugin-worker-factory/compare/v0.5.2...v0.5.3) (2021-03-11)

### Bug Fixes

* mock worker coverage support ([9ebfea6](https://github.com/brandonocasey/rollup-plugin-worker-factory/commit/9ebfea6))

<a name="0.5.2"></a>
## [0.5.2](https://github.com/brandonocasey/rollup-plugin-worker-factory/compare/v0.5.1...v0.5.2) (2021-03-11)

### Bug Fixes

* mock worker terminate cleanup ([d4a264b](https://github.com/brandonocasey/rollup-plugin-worker-factory/commit/d4a264b))

<a name="0.5.1"></a>
## [0.5.1](https://github.com/brandonocasey/rollup-plugin-worker-factory/compare/v0.5.0...v0.5.1) (2021-02-17)

### Bug Fixes

* make sure get-worker-string can be transcoded ([f5d732c](https://github.com/brandonocasey/rollup-plugin-worker-factory/commit/f5d732c))

<a name="0.5.0"></a>
# [0.5.0](https://github.com/brandonocasey/rollup-plugin-worker-factory/compare/v0.4.1...v0.5.0) (2021-02-16)

### Bug Fixes

* should work with minifiers and platforms without workers ([4685d39](https://github.com/brandonocasey/rollup-plugin-worker-factory/commit/4685d39))

<a name="0.4.1"></a>
## [0.4.1](https://github.com/brandonocasey/rollup-plugin-worker-factory/compare/v0.4.0...v0.4.1) (2021-01-25)

### Bug Fixes

* do not eval mock workers, prevents break point issues ([63fe865](https://github.com/brandonocasey/rollup-plugin-worker-factory/commit/63fe865))

<a name="0.4.0"></a>
# [0.4.0](https://github.com/brandonocasey/rollup-plugin-worker-factory/compare/v0.3.0...v0.4.0) (2021-01-25)

### Features

* support mock workers, document type option ([b1596c6](https://github.com/brandonocasey/rollup-plugin-worker-factory/commit/b1596c6))

<a name="0.3.0"></a>
# [0.3.0](https://github.com/brandonocasey/rollup-plugin-worker-factory/compare/v0.2.0...v0.3.0) (2020-12-18)

### Features

* support nodee, browser, or universal workers via a type option ([831a205](https://github.com/brandonocasey/rollup-plugin-worker-factory/commit/831a205))

<a name="0.2.0"></a>
# [0.2.0](https://github.com/brandonocasey/rollup-plugin-worker-factory/compare/v0.1.0...v0.2.0) (2020-12-17)

### Features

* comments before and after, better rollup config ([53e6d3f](https://github.com/brandonocasey/rollup-plugin-worker-factory/commit/53e6d3f))

### Bug Fixes

* trycatch worker_threads require and warn on error ([fd0d5de](https://github.com/brandonocasey/rollup-plugin-worker-factory/commit/fd0d5de))

<a name="0.1.0"></a>
# 0.1.0 (2020-12-10)

### Features

* intial working code ([722d65a](https://github.com/brandonocasey/rollup-plugin-worker-factory/commit/722d65a))

<a name="6.1.0"></a>
# [6.1.0](https://github.com/videojs/videojs-generate-rollup-config/compare/v6.0.2...v6.1.0) (2020-12-09)

### Bug Fixes

* inline json for module files ([#38](https://github.com/videojs/videojs-generate-rollup-config/issues/38)) ([faf4bdd](https://github.com/videojs/videojs-generate-rollup-config/commit/faf4bdd))

<a name="6.0.2"></a>
## [6.0.2](https://github.com/videojs/videojs-generate-rollup-config/compare/v6.0.1...v6.0.2) (2020-10-22)

### Bug Fixes

* prevent warning on module build ([33f6c6c](https://github.com/videojs/videojs-generate-rollup-config/commit/33f6c6c))

<a name="6.0.1"></a>
## [6.0.1](https://github.com/videojs/videojs-generate-rollup-config/compare/v6.0.0...v6.0.1) (2020-10-19)

### Bug Fixes

* minifier plugin, babel-config update ([#36](https://github.com/videojs/videojs-generate-rollup-config/issues/36)) ([da2ae25](https://github.com/videojs/videojs-generate-rollup-config/commit/da2ae25))

<a name="6.0.0"></a>
# [6.0.0](https://github.com/videojs/videojs-generate-rollup-config/compare/v5.0.2...v6.0.0) (2020-10-05)

### Features

* use [@videojs](https://github.com/videojs)/babel-config ([#33](https://github.com/videojs/videojs-generate-rollup-config/issues/33)) ([f522b73](https://github.com/videojs/videojs-generate-rollup-config/commit/f522b73))

### Chores

* update package versions ([#32](https://github.com/videojs/videojs-generate-rollup-config/issues/32)) ([aa592a2](https://github.com/videojs/videojs-generate-rollup-config/commit/aa592a2))


### BREAKING CHANGES

* requires rollup@^2

<a name="5.0.2"></a>
## [5.0.2](https://github.com/videojs/videojs-generate-rollup-config/compare/v5.0.1...v5.0.2) (2020-03-24)

### Chores

* **package:** update to babel 7.9 and enable bugfixes ([71c71db](https://github.com/videojs/videojs-generate-rollup-config/commit/71c71db))

<a name="5.0.1"></a>
## [5.0.1](https://github.com/videojs/videojs-generate-rollup-config/compare/v5.0.0...v5.0.1) (2019-08-16)

### Bug Fixes

* peer dependency issue ([f142f80](https://github.com/videojs/videojs-generate-rollup-config/commit/f142f80))

<a name="5.0.0"></a>
# [5.0.0](https://github.com/videojs/videojs-generate-rollup-config/compare/v4.0.0...v5.0.0) (2019-08-16)

### Features

* **BREAKING:**  Use `[@babel](https://github.com/babel)/plugin-transform-runtime` to turn babel helpers into requires ([#25](https://github.com/videojs/videojs-generate-rollup-config/issues/25)) ([9a64e3d](https://github.com/videojs/videojs-generate-rollup-config/commit/9a64e3d))

<a name="4.0.0"></a>
# [4.0.0](https://github.com/videojs/videojs-generate-rollup-config/compare/v3.2.1...v4.0.0) (2019-07-15)

### Features

* no coverage option ([#21](https://github.com/videojs/videojs-generate-rollup-config/issues/21)) ([6150638](https://github.com/videojs/videojs-generate-rollup-config/commit/6150638))

### Bug Fixes

* Make defaults immutable, so watch does not continuously change them ([#23](https://github.com/videojs/videojs-generate-rollup-config/issues/23)) ([3113a40](https://github.com/videojs/videojs-generate-rollup-config/commit/3113a40))

### Chores

* **package:** update node-resolve and commonjs ([#20](https://github.com/videojs/videojs-generate-rollup-config/issues/20)) ([5237b77](https://github.com/videojs/videojs-generate-rollup-config/commit/5237b77))

### Performance Improvements

* Faster builds by combining similar builds, and using env vars ([#22](https://github.com/videojs/videojs-generate-rollup-config/issues/22)) ([7d83aea](https://github.com/videojs/videojs-generate-rollup-config/commit/7d83aea))


### BREAKING CHANGES

* externals are now merged with globals before being passed to the user externals function.
* istanbul is removed from plugin list before use function on --watch or coverage false
* defaults are now immutable as intended.
* minBrowser is now part of browser and both module
builds are under the same name
* **package:** require rollup ^1.12.0

<a name="3.2.1"></a>
## [3.2.1](https://github.com/videojs/videojs-generate-rollup-config/compare/v3.2.0...v3.2.1) (2019-06-28)

### Bug Fixes

* check if istanbul is in plugins first before removing ([#19](https://github.com/videojs/videojs-generate-rollup-config/issues/19)) ([6b3bffc](https://github.com/videojs/videojs-generate-rollup-config/commit/6b3bffc))

<a name="3.2.0"></a>
# [3.2.0](https://github.com/videojs/videojs-generate-rollup-config/compare/v3.1.1...v3.2.0) (2019-04-24)

### Features

* use new node resolve options ([#17](https://github.com/videojs/videojs-generate-rollup-config/issues/17)) ([9f3c973](https://github.com/videojs/videojs-generate-rollup-config/commit/9f3c973))

<a name="3.1.1"></a>
## [3.1.1](https://github.com/videojs/videojs-generate-rollup-config/compare/v3.1.0...v3.1.1) (2019-04-24)

### Bug Fixes

* more strict rollup watch check regex ([#18](https://github.com/videojs/videojs-generate-rollup-config/issues/18)) ([01de5a2](https://github.com/videojs/videojs-generate-rollup-config/commit/01de5a2))

<a name="3.1.0"></a>
# [3.1.0](https://github.com/videojs/videojs-generate-rollup-config/compare/v3.0.2...v3.1.0) (2019-03-06)

### Features

* no coverage during watch ([#15](https://github.com/videojs/videojs-generate-rollup-config/issues/15)) ([6b66596](https://github.com/videojs/videojs-generate-rollup-config/commit/6b66596))

### Bug Fixes

* **security:** fix security issues by updating package-lock.json ([7bbf448](https://github.com/videojs/videojs-generate-rollup-config/commit/7bbf448))

### Chores

* switch to [@videojs](https://github.com/videojs)/generator-helpers ([ffd9842](https://github.com/videojs/videojs-generate-rollup-config/commit/ffd9842))

<a name="3.0.2"></a>
## [3.0.2](https://github.com/videojs/videojs-generate-rollup-config/compare/v3.0.1...v3.0.2) (2019-01-08)

### Documentation

* update readme about rollup support ([79310bd](https://github.com/videojs/videojs-generate-rollup-config/commit/79310bd))

### Reverts

* the previous terser fix and update to a new version ([#14](https://github.com/videojs/videojs-generate-rollup-config/issues/14)) ([8db61e6](https://github.com/videojs/videojs-generate-rollup-config/commit/8db61e6)), closes [#12](https://github.com/videojs/videojs-generate-rollup-config/issues/12)

<a name="3.0.1"></a>
## [3.0.1](https://github.com/videojs/videojs-generate-rollup-config/compare/v3.0.0...v3.0.1) (2019-01-08)

### Bug Fixes

* rollup terser plugin ci issue ([#11](https://github.com/videojs/videojs-generate-rollup-config/issues/11)) ([19696cd](https://github.com/videojs/videojs-generate-rollup-config/commit/19696cd))

<a name="3.0.0"></a>
# [3.0.0](https://github.com/videojs/videojs-generate-rollup-config/compare/v2.3.1...v3.0.0) (2019-01-08)

### Features

* Update to use Rollup 1.x ([#10](https://github.com/videojs/videojs-generate-rollup-config/issues/10)) ([19c9cf4](https://github.com/videojs/videojs-generate-rollup-config/commit/19c9cf4))


### BREAKING CHANGES

* This is considered a breaking change because it is not expected to work with pre-1.0 versions of Rollup.

<a name="2.3.1"></a>
## [2.3.1](https://github.com/videojs/videojs-generate-rollup-config/compare/v2.3.0...v2.3.1) (2018-10-18)

### Bug Fixes

* Merge excludeCoverage option creating istanbul plugin ([#9](https://github.com/videojs/videojs-generate-rollup-config/issues/9)) ([451dac9](https://github.com/videojs/videojs-generate-rollup-config/commit/451dac9))

<a name="2.3.0"></a>
# [2.3.0](https://github.com/videojs/videojs-generate-rollup-config/compare/v2.2.0...v2.3.0) (2018-10-11)

### Features

* switch to terser ([#7](https://github.com/videojs/videojs-generate-rollup-config/issues/7)) ([6876512](https://github.com/videojs/videojs-generate-rollup-config/commit/6876512))

<a name="2.2.0"></a>
# [2.2.0](https://github.com/videojs/videojs-generate-rollup-config/compare/v2.1.0...v2.2.0) (2018-09-06)

### Features

* Allow babel customization through a babel option ([#5](https://github.com/videojs/videojs-generate-rollup-config/issues/5)) ([a98daac](https://github.com/videojs/videojs-generate-rollup-config/commit/a98daac))

### Chores

* update husky ([fa52490](https://github.com/videojs/videojs-generate-rollup-config/commit/fa52490))

<a name="2.1.0"></a>
# [2.1.0](https://github.com/videojs/videojs-generate-rollup-config/compare/v2.0.1...v2.1.0) (2018-08-30)

### Features

* expose makeBuild ([9ecee3b](https://github.com/videojs/videojs-generate-rollup-config/commit/9ecee3b))

<a name="2.0.1"></a>
## [2.0.1](https://github.com/videojs/videojs-generate-rollup-config/compare/v2.0.0...v2.0.1) (2018-08-28)

### Bug Fixes

* rollup-plugin-istanbul must be a dependency ([fb5419b](https://github.com/videojs/videojs-generate-rollup-config/commit/fb5419b))

<a name="2.0.0"></a>
# [2.0.0](https://github.com/videojs/videojs-generate-rollup-config/compare/v1.0.0...v2.0.0) (2018-08-28)

### Features

* code coverage ([#3](https://github.com/videojs/videojs-generate-rollup-config/issues/3)) ([08b09e2](https://github.com/videojs/videojs-generate-rollup-config/commit/08b09e2))
* update to babel 7 ([#2](https://github.com/videojs/videojs-generate-rollup-config/issues/2)) ([ddeb89e](https://github.com/videojs/videojs-generate-rollup-config/commit/ddeb89e))

### Chores

* update tooling ([d606844](https://github.com/videojs/videojs-generate-rollup-config/commit/d606844))


### BREAKING CHANGES

* babel package names have changed
* Adds a dependency and options.

<a name="1.0.0"></a>
# 1.0.0 (2018-08-17)

### Features

* initial ([#1](https://github.com/videojs/videojs-generate-rollup-config/issues/1)) ([d2700f4](https://github.com/videojs/videojs-generate-rollup-config/commit/d2700f4))

### Chores

* add travis, greenkeeper, changelog, and toc tools ([0905caa](https://github.com/videojs/videojs-generate-rollup-config/commit/0905caa))

