const io = require('socket.io')(3000, {
     cors: {
          origin: ['http://localhost:8081']
     }
});  

io.on('connection', (socket) => {
     console.log('New user connected', socket.id);
     // socket.on('custom-event', (num, str, obj) => {
     //      console.log(num, str, obj);
     // });
     socket.on('send-message', (message) => {
          console.log(message);
     });
});

