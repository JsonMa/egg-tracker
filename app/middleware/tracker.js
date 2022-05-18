'use strict'
const { v1: uuidv1 } = require('uuid')

module.exports = (options) => {
  function getPolyfillUUID() {
    const uuid = uuidv1()
    if (String.prototype.replaceAll) return uuid.replaceAll('-', '')
    return uuid.split('-').join('')
  }

  function idGenerator(format) {
    return format === 'random' ? getPolyfillUUID() : uuidv1()
  }

  return async function tracker(ctx, next) {
    const {
      autoGenerateParentSpanId = false,
      format = 'random',
      autoGenerateSpanId = true,
      key = 'tracker',
    } = options
    const { headers } = ctx
    const spanId = autoGenerateSpanId && idGenerator(format)
    const traceId = headers['trace-id'] || headers.traceId || idGenerator(format)
    let parentSpanId = headers['span-id'] || headers.spanID
    if (!parentSpanId && autoGenerateParentSpanId) parentSpanId = idGenerator(format)
    const tracker = {
      traceId,
      ...(spanId ? { spanId } : null),
      ...(parentSpanId ? { parentSpanId } : null),
    }
    ctx[key] = ctx.request[key] = ctx.response[key] = tracker
    await next()
  }
}
