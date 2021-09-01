import { game } from "./gameInit.js";

export const gettingPlayerById = (roomId, uid) => {
  return Object.keys(game[roomId]).find(key => game[roomId][key] === uid);
};

export const gettingOpponentPlayerByUserId = (roomId, uid) => {
  const user = gettingPlayerById(roomId, uid);
  if (user === 'firstPlayer') {
    return 'secondPlayer';
  }
  return 'firstPlayer';
};
