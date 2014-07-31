var
  express      = require('express'),
  path         = require('path'),
  load         = require('express-load'),
  app          = express();

app.use(express.static(path.join(__dirname, 'assets')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

load('models')
  .then('controllers')
  .then('routes')
  .into(app);

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
