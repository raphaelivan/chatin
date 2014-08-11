var socket = io.connect();
X = socket;

socket.on('send-client', function (msg) {
  document.getElementById('chat').innerHTML += msg;
});

var send = function() {
  var name = document.getElementById('name').value;
  var msg = document.getElementById('msg').value;
  socket.emit('send-server', {name: name, msg: msg});
};

document.getElementById('send').onclick = send;