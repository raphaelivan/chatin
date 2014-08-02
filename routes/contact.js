module.exports = function (app) {
  var contact = app.controllers.contact;

  app.get('/contacts', contact.index);
  app.get('/contact/:id', contact.show);
  app.get('/contact/:id/edit', contact.edit );
  app.post('/contact', contact.create);
  app.put('/contact/:id', contact.update);
  app.delete('/contact/:id', contact.destroy);
};