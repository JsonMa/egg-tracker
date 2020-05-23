'use strict';

const mock = require('egg-mock');
const assert = require('assert');
const { v1: uuidv1 } = require('uuid');

describe('test/tracing.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/tracing-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should response with requestId', () => {
    return app.httpRequest()
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        assert(response.body.requestId);
        assert(response.body.spanId);
        assert.equal(Reflect.has(response.body, 'parentSpanId'), false);
      });
  });

  it('should response with parentSpanId', () => {
    const requestId = uuidv1();
    const spanId = uuidv1();
    return app.httpRequest()
      .get('/')
      .set('Span-Id', spanId)
      .set('Request-Id', requestId)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        assert.equal(response.body.requestId, requestId);
        assert(response.body.spanId);
        assert.equal(response.body.parentSpanId, spanId);
      });
  });

  it('should response without parentSpanId', () => {
    const requestId = uuidv1();
    return app.httpRequest()
      .get('/')
      .set('Request-Id', requestId)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        assert.equal(response.body.requestId, requestId);
        assert(response.body.spanId);
        assert.equal(Reflect.has(response.body, 'parentSpanId'), false);
      });
  });
});
