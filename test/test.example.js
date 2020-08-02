const assert = require('assert');
var request = require('supertest');

describe('loading express', function () {
  var app;
  beforeEach(function () {
    app = require('../server');
  });

  afterEach(function () {
    app.close();
  });

  it('responds to /', function testSlash(done) {
  request(app)
    .get('/ping')
    .expect(200, done);
  });
  it('404 everything else', function testPath(done) {
    request(app)
      .get('/foo/bar')
      .expect(404, done);
  });
});

