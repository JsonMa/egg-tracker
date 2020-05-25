'use strict';

module.exports = {
  keys: '123456',
  middleware: [ 'tracker' ], // 配置需要的中间件，数组顺序即为中间件的加载顺序
  tracker: {
    autoGenerateSpanId: false, // 是否自动创建parentSpanId,当http header中不存在时
    format: 'uuid',
    autoGenerateParentSpanId: true, // 是否自动创建parentSpanId,当http header中不存在时
  },
};
