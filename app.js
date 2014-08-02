var
  express      = require('express'),
  path           = require('path'),
  bodyParser = require('body-parser'),
  session       = require('cookie-session'),
  load           = require('express-load'),
  app            = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(session({keys: ['key1', 'key2']}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'assets')));

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
