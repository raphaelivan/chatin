module.exports = function (app) {
  var User  = app.models.user;

  var ContactController = {
    index:  function (req, res) {
      var
        _id   = req.session.user._id;

      User.findById(_id, function (error, user) {
        var
          contacts = user.contacts,
          params   = { contacts: contacts };

        res.render('contacts/index', params);
      });
    },

    create: function (req, res) {
      var _id = req.session.user._id;

      User.findById(_id, function (error, user) {
        user.contacts.push(req.body.contact);
        user.save( function () {
          res.redirect('/contacts');
        });
      });
    },

    show: function (req, res) {
      var _id = req.session.user._id;

      User.findById(_id, function (error, user) {
        var
          contactId = req.params.id,
          contact   = user.contacts.id(contactId);
          res.render('contacts/show', { contact: contact });
      });
    },

    edit: function (req, res) {
      var _id = req.session.user._id;

      User.findById(_id, function (error, user) {
        var
          contactId = req.params.id,
          contact   = user.contacts.id(contactId);

        res.render('contacts/edit', { contact: contact });
      });
    },

    update: function (req, res) {
     // do nothing
     res.redirect('/contacts');
    },

    destroy: function (req, res) {
     // do nothing
      res.redirect('/contacts');
    }
  }

  return ContactController;
}