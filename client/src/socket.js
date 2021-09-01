import { io } from 'socket.io-client';

let socket;
function init() {
  if (socket) {
    return socket;
  }
  socket = io('http://localhost:5000');
  return socket;
}

export default init;