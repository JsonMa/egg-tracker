'use strict';

/**
 * egg-tracing default config
 * @member Config#tracing
 * @property {String} SOME_KEY - some description
 */
exports.tracing = {
  autoGenerateParentSpanId: false, // disable auto generate parent span-id (默认关闭自动创建parent span-id)
};
