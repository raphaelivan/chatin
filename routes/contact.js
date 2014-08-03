module.exports = function (app) {
  var
    authenticate = require('./../midleware/authenticator'),
    contact        = app.controllers.contact;

  app.get('/contacts', authenticate, contact.index);
  app.get('/contact/:id', authenticate, contact.show);
  app.get('/contact/:id/edit', authenticate, contact.edit );
  app.post('/contact', authenticate, contact.create);
  app.put('/contact/:id', authenticate, contact.update);
  app.delete('/contact/:id', authenticate, contact.destroy);
};