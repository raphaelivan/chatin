module.exports = function (app) {
  var session = app.controllers.session;

  app.post('/login', session.login);
  app.get('/logout', session.logout);
};