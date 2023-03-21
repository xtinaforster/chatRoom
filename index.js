const express = require('express');

const app = express();

var users = [];

var http = require('http');
var server = http.Server(app);
var io = require('socket.io')(server);

app.use('/client', express.static(__dirname + '/client'));

app.get('/', function(request, result){
  result.sendFile(__dirname + '/client/index.html');
});

server.listen(3001, function(){
  console.log("server started");
});

io.on('connection', function(socket){
  socket.emit('new_user');

  socket.on('send_message', function(data) {
    var username = users[socket.id];
    io.emit('new_message', {message: '<li><b>' + username + ":</b>" + data.message + "</li>"});
  })
  socket.on('add_user', function(user){
    users[socket.id] = user.user;
    io.emit('new_message', {message: "<li>" + user.user + " has joined the chat</li>"})
  })
});