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
[travis-image]: https://img.shields.io/travis/eggjs/egg-tracker.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-tracker
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-tracker.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-tracker?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-tracker.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-tracker
[snyk-image]: https://snyk.io/test/npm/egg-tracker/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-tracker
[download-image]: https://img.shields.io/npm/dm/egg-tracker.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-tracker

Eggjs tracer 插件 - 自动为每个HTTP请求生成tracer对象（该tracer对象包含了traceId、spanId、parentSpanId属性），并将其注入到了ctx, ctx.request, ctx,response中。

## 依赖说明

### 依赖的 egg 版本

egg-tracker 版本 | egg 1.x
--- | ---
1.x | 😁
0.x | ❌

## 开启插件

```js
// config/plugin.js
exports.tracker = {
  enable: true,
  package: 'egg-tracker',
};
```

## 名词注解

- traceId: 请求ID，具有全局唯一性，用于标识一个具体的HTTP请求，当HTTP header中不携带**trace-id** 时，插件会自动生成该ID。
- spanId: 跨度ID，具有全局唯一性，服务启用插件后，插件自动为该服务的每个HTTP请求自动生成spanId。
- parentSpanId: 负节点跨度ID，具有全局唯一性，上一个服务节点所生成的spanId, 插件通过自定义的HTTP header **span-id** 来获取该值, 若不存在，则以为着该节点为根节点，其值默认为 **"-1"** 。

## 使用场景

- 链路追踪：本插件能为每个HTTP请求自动生成全局唯一的spanId, 结合traceId + parentSpanId能够快速的构建完成的HTTP请求树。

## 详细配置

```js

// {app_root}/config/config.default.js
exports.tracker = {
  format: 'random', // 32 byte random string or uuid string, random as default（数据格式，默认为32字节字符串）
  autoGenerateSpanId: true, // Enable auto generate span-id (默认开启自动生成span-id)
  autoGenerateParentSpanId: false, // Disable auto generate parent span-id (默认关闭自动创建parent span-id)
};

exports.middleware = ['tracker'] // 启用tracker中间件

```

请到 [config/config.default.js](config/config.default.js) 查看详细配置项说明。

## 使用示例

```js
// {app_root}/controller/index.js

const Controller = require('egg').Controller;

class HomeController extends Controller {
/**
 * 通过ctx, ctx.request or ctx.response等方式获取tracer对象.
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

## 提问交流

请到 [egg issues](https://github.com/JsonMa/egg-tracker/issues) 异步交流。

## License

[MIT](LICENSE)
