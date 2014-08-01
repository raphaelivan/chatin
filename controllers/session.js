module.exports = function (app) {

  var SessionController = {

    logout: function (req, res) {
      req.session = null;
      res.redirect('/');
    },

    login: function (req, res) {
      var
        email = req.body.user.email,
        name =req.body.user.name;

      if (email && name) {
        var user = req.body.user;
        user.contacts = [];
        req.session.user = user;
        res.redirect('/contacts');
      } else {
        res.redirect('/');
      }
    }
  }

  return SessionController;
}