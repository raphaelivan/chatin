module.exports = function (app) {

  var SessionController = {

    logout: function (req, res) {
      req.session = null;
      res.redirect('/');
    },

    login: function (req, res) {
      var
        email = req.body.user.email,
        name  = req.body.user.name,
        User  = app.models.user;

      User
        .findOne( { email: email })
        .select('name email')
        .exec( function (error, user) {
          if (user) {
            req.session.user = user;
            res.redirect('/contacts');
          } else {
            User.create(req.body.user, function (error, user) {
              if (error) {
                res.redirect('/');
              } else {
                req.session.user = user;
                res.redirect('/contacts');
              }
            });
          }
        });
    }
  }

  return SessionController;
}