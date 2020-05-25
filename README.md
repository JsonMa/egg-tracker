# egg-tracker

[中文文档](https://github.com/JsonMa/egg-tracker/blob/master/README.zh_CN.md)

[English Document](https://github.com/JsonMa/egg-tracker/blob/master/README.md)

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-tracker.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-tracker
[travis-image]: https://img.shields.io/travis/JsonMa/egg-tracker.svg?style=flat-square
[travis-url]: https://travis-ci.org/JsonMa/egg-tracker
[codecov-image]: https://img.shields.io/codecov/c/github/JsonMa/egg-tracker.svg?style=flat-square
[codecov-url]: https://codecov.io/github/JsonMa/egg-tracker?branch=master
[david-image]: https://img.shields.io/david/JsonMa/egg-tracker.svg?style=flat-square
[david-url]: https://david-dm.org/JsonMa/egg-tracker
[snyk-image]: https://snyk.io/test/npm/egg-tracker/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-tracker
[download-image]: https://img.shields.io/npm/dm/egg-tracker.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-tracker

  Eggjs tracer plugin which can generate a new tracer object for each **ctx, ctx.request and ctx.response** instance automatically.

## Install

```bash
$ npm i egg-tracker --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.tracker = {
  enable: true,
  package: 'egg-tracker',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.tracker = {
  format: 'random', // 32 byte random string or uuid string, random as default（数据格式，默认为32字节字符串）
  autoGenerateSpanId: true, // Enable auto generate span-id (默认开启自动生成span-id)
  autoGenerateParentSpanId: false, // Disable auto generate parent span-id (默认关闭自动创建parent span-id)
};

exports.middleware = ['tracker'] // Enable tracker middleware

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
 * @params {string} tracer.traceId      - generate by plugin automatically if http headers doesn't include trace-id.
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

Please open an issue [here](https://github.com/JsonMa/egg-tracker/issues).

## License

[MIT](LICENSE)
