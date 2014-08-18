var
  app     = require('../app'),
  should  = require('should'),
  request = require('supertest')(app);

describe('Controller Contacts', function (){
  describe('When user is logged', function () {
    it('should redirect to /', function (done) {
      request
        .get('/contacts')
        .expect(302, done)
        .expect('Moved Temporarily. Redirecting to /')
    });
  });
});


