import { randomUsers, friendUsers, rooms } from "../gameInit.js";


const indexSearch = (roomId) => {
  for (let room in rooms) {
    if (rooms[room] === roomId) {
      return room 
    }
  }
}

export const disconnectHandler = socketId => {
  if (randomUsers[socketId]) {
    const roomId = randomUsers[socketId].roomId;
    delete randomUsers[socketId];
    leavingRoomAfterOpponentDisconnect(roomId, 'random');
  } else if (friendUsers[socketId]) {
    const roomId = friendUsers[socketId].roomId;
    delete friendUsers[socketId];
    leavingRoomAfterOpponentDisconnect(roomId, 'friend');
  }
};



const leavingRoomAfterOpponentDisconnect = (roomId, type) => {
  if (type === 'random') {
    for (let user in randomUsers) {
      if (randomUsers[user].roomId === roomId) {
        randomUsers[user].socket.emit('opponent disconnection');
        randomUsers[user].socket.leave(roomId);
        delete randomUsers[user];
      }
    }
  } else if (type === 'friend') {
    for (let user in friendUsers) {
      if (friendUsers[user].roomId === roomId) {
        friendUsers[user].socket.emit('opponent disconnection');
        friendUsers[user].socket.leave(roomId);
        delete friendUsers[user];
      }
    }
  }
  const roomIndex = indexSearch(roomId)
  rooms.splice(roomIndex)
};
