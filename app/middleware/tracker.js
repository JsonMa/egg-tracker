'use strict';
const { v1: uuidv1 } = require('uuid');

module.exports = options => {

  function idGenerator(format) {
    return format === 'random' ? uuidv1().split('-').join('') : uuidv1();
  }

  return async function tracer(ctx, next) {
    const { autoGenerateParentSpanId = false, format = 'random', autoGenerateSpanId = true } = options;
    const { headers } = ctx;
    const spanId = autoGenerateSpanId && idGenerator(format);
    const traceId = headers['trace-id'] || idGenerator(format);
    let parentSpanId = headers['span-id'];
    if (!parentSpanId && autoGenerateParentSpanId) parentSpanId = idGenerator(format);
    const tracer = {
      traceId,
      ...spanId ? { spanId } : null,
      ...parentSpanId ? { parentSpanId } : null,
    };
    ctx.tracer = ctx.request.tracer = ctx.response.tracer = tracer;
    await next();
  };
};
