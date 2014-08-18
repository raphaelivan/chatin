var
  app     = require('../app'),
  request = require('supertest')(app);

describe('Session Crontol', function () {
  it('When the user is not logged in, redirect it to /', function (done) {
    request
    .get('/contacts')
    .expect(302, done)
    .expect('Moved Temporarily. Redirecting to /');
  });

  it('Create a session', function (done) {
    var data = {
        user: {
        name: 'User',
        email: 'user@chatin'
      }
    }

    request
    .post('/login')
    .send(data)
    .expect(302, done)
    .expect('Moved Temporarily. Redirecting to /contacts');
  });

  it('Trying create a session without fill the form', function (done) {
    var data = {
        user: {
        name: '',
        email: ''
      }
    }

    request
    .post('/login')
    .send(data)
    .expect(302, done)
    .expect('Moved Temporarily. Redirecting to /')
  });

  it('logout', function (done) {
    request
    .get('/logout')
    .expect(302, done)
    .expect('Moved Temporarily. Redirecting to /');
  })
});