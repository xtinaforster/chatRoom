var socket = io();

socket.on('new_user', function(data){
  var username = prompt("Select a username", "Anonymous");
  socket.emit('add_user', {user: username});
})

socket.on('new_message', function(data){
  $("#messages").append(data.message);
})

function sendMessage(){
  socket.emit('send_message', {message: $("#message").val()})
}