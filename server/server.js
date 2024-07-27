const { instrument }= require('@socket.io/admin-ui');
const io = require('socket.io')(3000, {
     cors: {
          origin: ['http://localhost:8081'],
          credentials: true
     }
});  

const userIo = io.of('/user');
userIo.on('connection', socket => {
     console.log("connected to user namespace");
})

io.on('connection', (socket) => {
     console.log('New user connected', socket.id);
     socket.on('send-message', (message, room) => {
          if(room==='')
          socket.broadcast.emit('receive-message', message);
          else {
               socket.to(room).emit('receive-message', message);
          }
     });
     socket.on('join-room', (room,callback) => {
          socket.join(room);
          callback(`Joined room ${room}`);   
     });
});

instrument(io, {
     auth: false,
     mode:"development"
});

