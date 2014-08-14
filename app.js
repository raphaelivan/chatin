var
  express      = require('express'),
  app          = express(),
  load         = require('express-load'),
  http         = require('http'),
  error        = require('./midleware/error'),
  server       = http.createServer(app),
  io           = require('socket.io').listen(server),
  path         = require('path'),
  bodyParser   = require('body-parser'),
  session      = require('cookie-session'),
  mongoose     = require('mongoose');

global.db = mongoose.connect('mongodb://localhost/chatin');

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

load('sockets')
  .into(io);

app.use(error.notFound);
app.use(error.errorHandler);

server.listen(3000);

module.exports = app;