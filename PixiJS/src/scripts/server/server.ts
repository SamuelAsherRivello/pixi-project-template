/**
 * IMPORTANT FOR FILES OUTSIDE OF /CLIENT/: Always import using `.js` even though it's a `.ts` file.
 */

import http from 'http';
import { Server } from 'socket.io';

/////////////////////////////
// Optional : Connect to 
// Socket Client (See Client.ts)
/////////////////////////////
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket server is running\n');
});

const io = new Server(server);

io.on('connection', (socket) => {
  console.log(`[Server] New client connected with socket id = ${socket.id}`);
  
  socket.on('disconnect', () => {
    console.log(`[Server] Client disconnected with socket id = ${socket.id}`);
  });
});

const PORT = 3001;
const HOST = 'localhost'; // Explicitly specify localhost
server.listen(PORT, HOST, () => {
  console.log(`[Server] Listening on ${HOST}:${PORT}`);
});