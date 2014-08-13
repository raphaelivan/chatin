module.exports = function (io) {
  var EMOJI = require('../emoji').icons;

  io.sockets.on('connection', function (client) {
    var user;
    client.broadcast.emit('user-connected');

    client.on('send-server', function (data) {
      user = data.name;


      if (data.msg.match(/&*&/) !== -1) {
        var icon = data.msg.split(/[&&]/)[1];
        var msg  = data.msg.replace('&'+ icon +'&', "<img class='icon' src='/images/icons/" + EMOJI[icon] +"' alt='like'>");
      }

      var html = "<b>"+data.name+":</b> "+ msg +"<br>";

      client.emit('send-client', html);
      client.broadcast.emit('send-client', html);
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