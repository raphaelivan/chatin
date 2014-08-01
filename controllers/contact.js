module.exports = function (app) {
  var ContactController = {
    index:  function (req, res) {
      var
        user      = req.body.user,
        params = { user: user };

        res.render('contacts/index', params);
    }
  }
  return ContactController;
}