# egg-tracing

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-tracing.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-tracing
[travis-image]: https://img.shields.io/travis/eggjs/egg-tracing.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-tracing
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-tracing.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-tracing?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-tracing.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-tracing
[snyk-image]: https://snyk.io/test/npm/egg-tracing/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-tracing
[download-image]: https://img.shields.io/npm/dm/egg-tracing.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-tracing

<!--
Description here.
-->

## Install

```bash
$ npm i egg-tracing --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.tracing = {
  enable: true,
  package: 'egg-tracing',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.tracing = {
    autoGenerateParentSpanId: false, // Generate parent span-id automatically if http request headers doesn't include it.
};

exports.middleware = ['tracing'] // Enable tracing middleware

```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
