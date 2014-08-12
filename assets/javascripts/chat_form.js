var socket = io.connect();
var $msg   = document.getElementById('msg');
var $name  = document.getElementById('name').value;

socket.on('send-client', function (msg) {
  document.getElementById('chat').innerHTML += msg;
});

var send = function () {
  socket.emit('send-server', {name: $name, msg: $msg.value});
  clearFields();
  socket.emit('clear-typing');
};

var clearFields = function () {
  $msg.value = '';
};

$msg.onkeypress = function (e) {
  if (e.keyCode == 13) {
   send();
   return;
  }

  socket.emit('client-typing', { name: $name });
};

$msg.onblur = function () {
  socket.emit('clear-typing');
};

socket.on('typing', function (user) {
  document.getElementById('util').innerHTML = user.name +' is typing...';
});

socket.on('stop-typing', function (user) {
  document.getElementById('util').innerHTML = '';
});