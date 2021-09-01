import { rooms, gamePlayers, randomUsers, game } from "./gameInit.js";
import { settingGame } from "./settingGameLogic.js";

export const settingRooms = (type, friendOne = {}, friendTwo = {}) => {
  const roomId = '_' + Math.random().toString(36).substr(2, 9);
  rooms.push(roomId)
  if (type === 'random') {
    for (let user in randomUsers) {
      if (!randomUsers[user].roomId) {
        gamePlayers.push(randomUsers[user].id);
        randomUsers[user].socket.join(roomId);
        randomUsers[user].roomId = roomId;
      }
    }
    settingGame(roomId, gamePlayers[gamePlayers.length - 1], gamePlayers[gamePlayers.length - 2]);
    return ['room joined', roomId, game[roomId]];
  } else if (type === 'friend') {
    friendOne.roomId = roomId;
    friendTwo.roomId = roomId;
    friendOne.join(roomId);
    friendTwo.join(roomId);
    settingGame(roomId, friendOne.id, friendTwo.id);
    return ['room joined', roomId, game[roomId]];
  }
};