import  express from 'express';
import  http from 'http';
import  { Server } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Express and HTTP server
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server);

// Serve static files (for the frontend)
app.use(express.static('public'));

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for messages from the client
  socket.on('chat message', (msg) => {
    console.log('Message received:', msg);

    // Broadcast the message to all connected clients
    io.emit('chat message', msg);
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
