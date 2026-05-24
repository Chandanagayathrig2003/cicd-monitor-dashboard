import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

import app from './app.js';

dotenv.config();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

// Socket connection
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Simulate real-time deployment updates
setInterval(() => {
  const statuses = ['RUNNING', 'SUCCESS', 'FAILED'];

  const randomStatus =
    statuses[Math.floor(Math.random() * statuses.length)];

  io.emit('deploymentUpdated', {
    id: '1',
    status: randomStatus
  });

  console.log('Deployment updated:', randomStatus);
}, 10000);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
