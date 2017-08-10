#!/usr/bin/env nodejs

const express = require('express');
const app = express();

const io = require('socket.io');
const server = require('http').createServer(app);
const socket = io.listen(server);

const port = 3000;

let users = 0;

app.use(express.static(__dirname + '/public'));

socket.on('connection', function(socket){
  users++;
  console.log(users, 'connected');
  socket.on('disconnect', function(){ 
    users--;
    console.log(users, 'connected');
  });
});

server.listen(port, () => {
  console.log('Open on localhost:' + port);
});