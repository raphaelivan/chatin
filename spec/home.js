var
  app     = require('../app'),
  should  = require('should'),
  request = require('supertest')(app);

describe('Home controller', function () {
  it ('should return status code equal 200', function (done) {
    request
    .get('/')
    .expect(200, done)
  });
});