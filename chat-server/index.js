const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
let port = 5000;
let user = { users: {} };
let number = 0;
let rooms = {};
let role = [];

//////////////////////////////////////////////////
const max_connections = 2;
let current_connections = 0;
io.on('connection', socket => {
    console.log('<----user connected---->');
    socket.on('new-user', (obj) => {
        socket.on('disconnect', () => {
            console.log('when back ===>')
            delete rooms[obj.room].users[socket.id];
            current_connections--;
        });
        current_connections++;

        if (Object.keys(rooms).includes(obj.room)) {
            let count = 0;
            Object.keys(rooms[obj.room].users).forEach(key => {
                if (obj.role === rooms[obj.room].users[key].role) {
                    socket.emit('full-room', 'Room is full.');
                    count++;
                    socket.disconnect(true);
                }
            })
            if (count === 0)
                rooms[obj.room].users[socket.id] = { name: obj.name, role: obj.role };
        } else {
            user = { users: {} };
            rooms[obj.room] = user;//{chat:{user:pppp:sondos2},{numberofUser:2}}
            rooms[obj.room].users[socket.id] = { name: obj.name, role: obj.role };
        }
        console.log('roooms obj ====> ', rooms);
        let numberOfUsers = Object.keys(rooms[obj.room].users);
        if (numberOfUsers.length > 2) {
            socket.emit('full-room', 'Room is full.');
            socket.disconnect(true);
        }
        else {
            socket.on('disconnected', function () {
                rooms[obj.room].numberOfuser = number--;
                socket.leave(obj.room);
                socket.to(obj.room).broadcast.emit('user-disconnected', { name: obj.name, message: 'disconnected' });
                delete rooms[obj.room].users[socket.id];
            });


            socket.join(obj.room);
            socket.to(obj.room).broadcast.emit('user-connected', obj.name);
        }
        socket.on('send-chat-message', (payload) => {
            socket.to(obj.room).broadcast.emit('chat-message', { message: payload.message, name: rooms[obj.room].users[socket.id].name });
        });
    });
});
server.listen(port, () => { console.log(`Listening on port ${port}`); });