module.exports = function (app) {
  var ChatController = {
    index: function (req, res) {
      var params  = {
        user: req.session.user,
        email: req.params.email
      }

      res.render('chat/index', params);
    },

    left: function (req, res) {
      var params = { user: req.session.user };

      res.render('contacts');
    }
  }

  return ChatController;
}