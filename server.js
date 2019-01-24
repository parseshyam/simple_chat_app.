const express = require('express');
const app = express();
const port =  3000 ;
const socket = require('socket.io');
const http = require('http');

app.use(express.static('public'));
const server = http.createServer(app);
const io = socket(server);

var socketArray = [];

io.on('connection', (socket) => {
    socketArray.push(socket.id);
    io.sockets.emit('added',socketArray.length);


    socket.on('chat',(data)=> {
        io.sockets.emit('chat',data);
      //  io.sockets.emit('newuser',data);
        console.log(socketArray.length);
    });

    socket.on('typing',(data)=> {
       // io.sockets.emit('total',socketArray.length);
        socket.broadcast.emit('typing',data);
    });

    socket.on('nottyping',()=> {
         socket.broadcast.emit('nottyping');
     });

    socket.on('disconnect', ( ) => {
        //console.log('SOCKET DISCONNECTED _SOCKET_ID_ : '+socket.id );
        socketArray.pop(socket.id);
        //console.log('Total users connected : '+socketArray.length);
        io.sockets.emit('disconnected',socketArray.length);

    });
});






server.listen(port , () => {
    console.log('Listening to requests on port 3000. ');
})