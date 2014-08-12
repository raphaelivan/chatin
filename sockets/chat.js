module.exports = function (io) {
  io.sockets.on('connection', function (client) {
    var user;
    client.broadcast.emit('user-connected');

    client.on('send-server', function (data) {
      user = data.name;

      var msg = "<b>"+data.name+":</b> "+data.msg+"<br>";
      client.emit('send-client', msg);
      client.broadcast.emit('send-client', msg);
    });

    client.on('client-typing', function (data) {
      client.broadcast.emit('typing', data);
    });

    client.on('clear-typing', function (data) {
      client.broadcast.emit('stop-typing');
    });

    client.on('disconnect', function (data) {
      client.broadcast.emit('client-disconnect', user);
    });
  });
};