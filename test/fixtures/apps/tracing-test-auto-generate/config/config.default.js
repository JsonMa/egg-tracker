'use strict';

module.exports = {
  keys: '123456',
  middleware: [ 'tracing' ], // 配置需要的中间件，数组顺序即为中间件的加载顺序
  tracing: {
    autoGenerateParentSpanId: true, // 是否自动创建parentSpanId,当http header中不存在时
  },
};
