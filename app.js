var
  express      = require('express'),
  path           = require('path'),
  bodyParser = require('body-parser'),
  session       = require('cookie-session'),
  load           = require('express-load'),
  error          = require('./midleware/error'),
  app            = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(session({keys: ['key1', 'key2']}));
app.use(express.static(path.join(__dirname, 'assets')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

load('models')
  .then('controllers')
  .then('routes')
  .into(app);

app.use(error.notFound);
app.use(error.errorHandler);

module.exports = app;
