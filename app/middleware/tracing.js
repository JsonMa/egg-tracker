'use strict';
const { v1: uuidv1 } = require('uuid');

module.exports = options => {
  return async function tracer(ctx, next) {
    const { autoGenerateParentSpanId = false } = options;
    const { headers } = ctx;
    const spanId = uuidv1();
    const requestId = headers['request-id'] || uuidv1();
    let parentSpanId = headers['span-id'];
    if (!parentSpanId && autoGenerateParentSpanId) parentSpanId = uuidv1();
    const tracer = {
      requestId,
      spanId,
      ...parentSpanId ? { parentSpanId } : null,
    };
    ctx.tracer = ctx.request.tracer = ctx.response.tracer = tracer;
    await next();
  };
};
