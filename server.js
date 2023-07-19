const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app1 = express();
const server1 = http.createServer(app1);
const io = socketIO(server1);

const app2 = express();
const server2 = http.createServer(app2);

// Serve static files from the "public" directory
app1.use(express.static('public'));
app2.use(express.static('public'));

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chatMessage', (message) => {
    io.emit('chatMessage', {
      sender: 'User',
      message: message,
    });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const port1 = 3000;
const port2 = 3001;

// Start server for the first user
server1.listen(port1, () => {
  console.log(`Server 1 listening on port ${port1}`);
});

// Start server for the second user
server2.listen(port2, () => {
  console.log(`Server 2 listening on port ${port2}`);
});