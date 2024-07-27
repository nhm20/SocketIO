const io = require('socket.io')(3000, {
     cors: {
          origin: ['http://localhost:8081']
     }
});  

io.on('connection', (socket) => {
     console.log('New user connected', socket.id);
     socket.on('send-message', (message) => {
          // io.emit('receive-message', message);
          socket.broadcast.emit('receive-message', message);
          console.log(message);
     });
});

