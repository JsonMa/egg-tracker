'use strict';
const { v1: uuidv1 } = require('uuid');

module.exports = options => {
  function idGenerator(format) {
    return format === 'random' ? uuidv1().replaceAll('-', '') : uuidv1();
  }

  return async function tracker(ctx, next) {
    const {
      autoGenerateParentSpanId = false,
      format = 'random',
      autoGenerateSpanId = true,
      key = 'tracker',
    } = options;
    const { headers } = ctx;
    const spanId = autoGenerateSpanId && idGenerator(format);
    const traceId = headers['trace-id'] || headers.traceId || idGenerator(format);
    let parentSpanId = headers['span-id'] || headers.spanID;
    if (!parentSpanId && autoGenerateParentSpanId) parentSpanId = idGenerator(format);
    const tracker = {
      traceId,
      ...(spanId ? { spanId } : null),
      ...(parentSpanId ? { parentSpanId } : null),
    };
    ctx[key] = ctx.request[key] = ctx.response[key] = tracker;
    await next();
  };
};
