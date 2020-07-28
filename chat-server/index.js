const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
let port = 3031;
let user = { users: {} };

let rooms = {};
let role = [];
app.get('/', (req, res) => {
    res.render('index');
});


//////////////////////////////////////////////////


const max_connections = 2;
let current_connections = 0;

io.on('connection', socket => {
    console.log('conectedddddddddddddddddddd hokonda mtata');
    socket.on('new-user', (obj)=> {
        console.log('room',obj.room);
        console.log('name',obj.name);
        // if (role.length == 2 && role[0] === role[1]) {
        //     role.pop();
        //     socket.emit('disconnected', 'You cannot enter the room');
        //     socket.disconnect(true);
        // }
        rooms[obj.room] = user;
        rooms[obj.room].users[socket.id] = obj.name;
        // current_connections++;
        // if (current_connections > max_connections) {
        //     socket.emit('disconnected', 'Sorry. room is full.');
        //     socket.disconnect(true);
        // } else {
        //     socket.on('disconnect', function () {
        //         current_connections--;
        //         socket.leave(room);
        //         socket.to(room).broadcast.emit('user-disconnected', `${name} disconnected `);
        //         delete rooms[room].users[socket.id];
        //     });
            socket.join(obj.room);
            socket.to(obj.room).broadcast.emit('user-connected', obj.name);
        // }

        socket.on('send-chat-message', (payload) => {
            console.log('messagessssssss',payload.message);
            console.log('rooooooooooooom',obj.room);
            socket.to(obj.room).broadcast.emit('chat-message', { message: payload.message, name: rooms[obj.room].users[socket.id] });
        });
    });
});
server.listen(port, () => { console.log(`Listening on port ${port}`); });