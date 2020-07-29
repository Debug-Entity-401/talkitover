const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
let port = 5000;
let user = { users: {} };
let rooms = {};
let role = [];

//////////////////////////////////////////////////
const max_connections = 2;
let current_connections = 0;
io.on('connection', socket => {
    console.log('<-----user connected---->');
    socket.on('new-user', (obj) => {
        console.log('room', obj.room);
        console.log('name', obj.name);
        rooms[obj.room] = user;
        rooms[obj.room].users[socket.id] = obj.name;
        current_connections++;
        if (current_connections >= max_connections) {
            socket.emit('full-room', 'Room is full.');
            socket.disconnect(true);
        } else {
        socket.on('disconnected', function() {
            console.log(obj.name, 'disconnected');
            socket.leave(obj.room);
            socket.to(obj.room).broadcast.emit('user-disconnected', { name: obj.name, message: 'disconnected' });
            delete rooms[obj.room].users[socket.id];
        });

        socket.join(obj.room);
        socket.to(obj.room).broadcast.emit('user-connected', obj.name);
        }
        socket.on('send-chat-message', (payload) => {
            console.log('messagessssssss', payload.message);
            console.log('rooooooooooooom', obj.room);
            socket.to(obj.room).broadcast.emit('chat-message', { message: payload.message, name: rooms[obj.room].users[socket.id] });
        });
    });
});
server.listen(port, () => { console.log(`Listening on port ${port}`); });