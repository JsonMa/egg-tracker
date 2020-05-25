'use strict';

const mock = require('egg-mock');
const assert = require('assert');

describe('test/tracing.auto_generate.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/tracing-test-auto-generate',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should auto generate parentSpanId & traceId & spanId', () => {
    return app.httpRequest()
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        assert(response.body.traceId);
        assert(!response.body.spanId);
        assert(response.body.parentSpanId);
        assert(response.body.traceId.includes('-'));
      });
  });
});
