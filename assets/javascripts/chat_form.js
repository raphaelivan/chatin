var
  socket = io.connect(),
  $msg   = document.getElementById('msg'),
  $name  = document.getElementById('name').value,
  $util  = document.getElementById('util'),
  $chat  = document.getElementById('chat');

socket.on('send-client', function (msg) {
  $chat.innerHTML += msg;
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
  $util.innerHTML = user.name +' is typing...';
});

socket.on('stop-typing', function (user) {
  $util.innerHTML = '';
});

socket.on('client-disconnect', function (user) {
  $chat.innerHTML +=  '<b>' + user + ' left the rom</b></br>';
});

socket.on('user-connected', function () {
  $chat.innerHTML += '<b> A user entered the room</b></br>';
});