module.exports = function (app) {
  var contact = app.controllers.contact;

  app.get('/contacts', contact.index);
};