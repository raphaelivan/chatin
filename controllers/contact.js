module.exports = function (app) {
  var ContactController = {
    index:  function (req, res) {
      var
        user      = req.session.user,
        contacts = user.contacts,
        params = {
          user: user,
          contacts: contacts
        };

        res.render('contacts/index', params);
    },

    create: function (req, res) {
      var
        user     = req.session.user,
        contact = req.body.contact;
      user.contacts.push(contact);
      res.redirect('/contacts');
    },

    show: function (req, res) {
      var
        id         = req.params.id,
        contact = req.session.user.contacts[id],
        params = {
          id: id,
          contact: contact
        }

        res.render('contacts/show', params);
    },

    edit: function (req, res) {
      var
        id         = req.params.id,
        user      = req.session.user,
        contact =  user.contacts[id],
        params = {
          id: id,
          user: user,
          contact: contact
        }

      res.render('contacts/edit', params);
    },

    update: function (req, res) {
      var
        id         = req.params.id,
        contact = req.body.contact;
    },

    destroy: function (req, res) {
      var
        id     = req.params.id,
        user = req.session.user;

      user.contacts.slice(id, 1);
      res.redirect('/contacts');
    }
  }

  return ContactController;
}