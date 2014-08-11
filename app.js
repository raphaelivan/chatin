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
  session      = require('cookie-session');


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

// app.use(error.notFound);
// app.use(error.errorHandler);

server.listen(3000);

io.sockets.on('connection', function (client) {
  client.on('send-server', function (data) {
    var msg = "<b>"+data.name+":</b> "+data.msg+"<br>";
    client.emit('send-client', msg);
    client.broadcast.emit('send-client', msg);
  });
});

// server.listen(app.get('port'), function () {
//   console.log('Server UP!');
// });

module.exports = app;