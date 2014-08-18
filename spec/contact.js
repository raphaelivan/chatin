var
  app     = require('../app'),
  request = require('supertest')(app);

describe('Controller Contacts', function (){
  describe('When user is  not logged', function () {
    it('should redirect to /', function (done) {
      request
        .get('/contacts')
        .expect(302, done)
        .expect('Moved Temporarily. Redirecting to /')
    });
  });


  describe('When user is logged', function () {
    beforeEach(function (done) {
      var data = { user: {
          name: 'User',
          email: 'user@chatin'
        }
      };

      request
        .post('/login')
        .send(data)

      done();
    });


    it('should be able to see contacts list', function (done) {
      request
        .get('/contacts')
        .expect('Logout')
      done();
    });


    it('should be able to register a contact', function (done) {
      var data = {
          contact: {
            name: 'UserII',
            email: 'user2@chatin.com.br'
          }
      };

      request
        .post('/contact')
        .send(data)
        .expect(data.contact.name);
      done();
    });

    it('should be able to see the contact info', function (done) {
      var data = {
          contact: {
            name: 'UserII',
            email: 'user2@chatin.com.br'
          }
      };

      request
        .post('/contact')
        .send(data)

      request
        .get('/contact/'+data.contact.email)
        .expect(data.contact.name)

      done();
    });
  });
});


