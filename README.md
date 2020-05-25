# egg-tracing

[中文文档](https://github.com/JsonMa/egg-tracing/blob/master/README.zh_CN.md)

[English Document](https://github.com/JsonMa/egg-tracing/blob/master/README.md)

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-tracing.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-tracing
[travis-image]: https://img.shields.io/travis/JsonMa/egg-tracing.svg?style=flat-square
[travis-url]: https://travis-ci.org/JsonMa/egg-tracing
[codecov-image]: https://img.shields.io/codecov/c/github/JsonMa/egg-tracing.svg?style=flat-square
[codecov-url]: https://codecov.io/github/JsonMa/egg-tracing?branch=master
[david-image]: https://img.shields.io/david/JsonMa/egg-tracing.svg?style=flat-square
[david-url]: https://david-dm.org/JsonMa/egg-tracing
[snyk-image]: https://snyk.io/test/npm/egg-tracing/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-tracing
[download-image]: https://img.shields.io/npm/dm/egg-tracing.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-tracing

Eggjs tracer plugin which can generator a new tracer object to each **ctx/ctx.request/ctx.response** instance automatically.

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
```js
// {app_root}/controller/index.js

const Controller = require('egg').Controller;

class HomeController extends Controller {
/**
 * Get tracer object through ctx, ctx.request or ctx.response.
 *
 * @params {string} tracer.traceId    - generate by plugin automatically if http headers doesn't include trace-id.
 * @params {string} tracer.spanId       - generate by plugin automatically.
 * @params {string} tracer.parentSpanId - get from http header of span-id.
 * 
 * @memberof HomeController
 */
  async index() {
    this.ctx.body = this.ctx.tracer;
  }
}

module.exports = HomeController;
```


## Questions & Suggestions

Please open an issue [here](https://github.com/JsonMa/egg-tracing/issues).

## License

[MIT](LICENSE)
