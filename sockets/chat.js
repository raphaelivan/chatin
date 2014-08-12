module.exports = function (io) {
  io.sockets.on('connection', function (client) {
    client.on('send-server', function (data) {
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
  });
};