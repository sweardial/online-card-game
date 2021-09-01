import { randomUsers, friendUsers } from './gameInit.js';
import { settingRooms } from './settingRooms.js';

export const createRoomWithRandom = (socket, data) => {
  randomUsers[socket.id] = {
    username: data.username,
    id: socket.id,
    socket: socket,
    roomId: '',
  };
  if (!(Object.keys(randomUsers).length % 2)) {
    return settingRooms('random');
  }
};

export const createRoomWithFriend = (socket, data) => {
  const sessionKey = Math.random().toString(36).substr(2, 9);
  friendUsers[socket.id] = {
    username: data.username,
    id: socket.id,
    socket: socket,
    sessionKey: sessionKey,
    roomId: '',
  };
  socket.emit('session key', sessionKey);
};

export const joinFriend = (socket, data) => {
  friendUsers[socket.id] = {
    username: data.username,
    id: socket.id,
    socket: socket,
    sessionKey: data.sessionKey,
    roomId: '',
  };
  for (let user in friendUsers) {
    if (friendUsers[user].sessionKey === data.sessionKey && friendUsers[user].id !== socket.id) {
      socket.emit('valid code');
      return settingRooms('friend', friendUsers[socket.id].socket, friendUsers[user].socket);
    }
  }
  return;
};
