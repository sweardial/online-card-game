import { io } from 'socket.io-client';
import dotenv from 'dotenv';
dotenv.config();

let socket;
function init() {
  if (socket) {
    return socket;
  }
  socket = io(process.env.APP_URL);
  return socket;
}

export default init;