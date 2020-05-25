'use strict';

/**
 * egg-tracker default config
 *
 * @member Config#tracing
 * @property {String} SOME_KEY - some description
 */
exports.tracker = {
  format: 'random', // random or uuid, random as default（数据格式，默认为32字节字符串）
  autoGenerateSpanId: true, // Enable auto generate span-id (默认开启自动生成span-id)
  autoGenerateParentSpanId: false, // Disable auto generate parent span-id (默认关闭自动创建parent span-id)
};
