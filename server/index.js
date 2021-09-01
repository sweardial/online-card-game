import express from 'express';
const app = express();
import http from 'http';
const server = http.createServer(app);
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

import { createRoomWithFriend, createRoomWithRandom, joinFriend } from './logic/creatingRooms.js';
import { disconnectHandler } from './logic/playerActions/disconnection.js';
import { grabbingEvent, grabCardsHandler } from './logic/playerActions/grabbingEvents.js';
import { checkingTossingCards } from './logic/cardLogic.js';
import { cardClickedHandler } from './logic/playerActions/cardClicked.js';
import { doneAttackHandler } from './logic/playerActions/attackAndDefenseEvents.js';
import { winningCheck } from './logic/winningCheck.js';


import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT;
const io = new Server(server, {
  cors: '*',
});

const socketHandler = socket => {
  socket.on('new connection', data => {
    if (data.opponentType === 'random') {
      try {
        const [type, roomId, game] = createRoomWithRandom(socket, data);
        io.to(roomId).emit(type, roomId, game);
      } catch (e) {
        console.log(e, 'waiting for another random player');
      }
    } else if (data.opponentType === 'friend') {
      try {
        const [type, roomId, game] = createRoomWithFriend(socket, data);
        io.to(roomId).emit(type, roomId, game);
      } catch (e) {
        console.log('waiting for another friend');
      }
    } else if (data.sessionKey) {
      try {
        const [type, roomId, game] = joinFriend(socket, data);
        io.to(roomId).emit(type, roomId, game);
      } catch (e) {
        socket.emit('invalid code');
        console.log("Invalid friend's code");
      }
    }
  });

  socket.on('card clicked', data => {
    try {
      const [type, card, deck, uid] = cardClickedHandler(socket.id, data);
      io.to(data.roomId).emit(type, card, deck, uid);
      const result = winningCheck(data.roomId);
      if (result) {
        io.to(data.roomId).emit('game over', result);
        return;
      }
    } catch (e) {
      console.log(e, 'Wrong card or not user turn');
    }
  });

  socket.on('done attack', data => {
    const { roomId } = data;
    try {
      const [type, userId, deck, firstPlayerDeck, secondPlayerDeck] = doneAttackHandler(data);
      const result = winningCheck(data.roomId);
      if (result) {
        io.to(data.roomId).emit('game over', result);
        return;
      }
      io.to(roomId).emit(type, userId, deck, firstPlayerDeck, secondPlayerDeck);
    } catch (e) {
      console.log('Done attack error occured', e);
    }
  });

  socket.on('grab cards', ({ roomId, uid }) => {
    try {
      if (checkingTossingCards(roomId, uid)) {
        grabbingEvent(roomId, uid);
        io.to(roomId).emit('user is grabbing');
        return;
      }
      const [type, userId, deck, firstPlayerDeck, secondPlayerDeck] = grabCardsHandler(roomId, uid);
      io.to(roomId).emit(type, userId, deck, firstPlayerDeck, secondPlayerDeck);
      const result = winningCheck(roomId);
      if (result) {
        io.to(roomId).emit('game over', result);
        return;
      }
    } catch (e) {
      console.log('Grabbing cards error occured', e);
    }
  });

  socket.on('disconnect', () => {
    disconnectHandler(socket.id);
  });
};

io.on('connection', socketHandler);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../', 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'client', 'build', 'index.html'));
  });
}

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
