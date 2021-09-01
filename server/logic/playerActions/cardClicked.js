import { game } from '../gameInit.js';
import { attackHandler, defenseHandler } from './attackAndDefenseEvents.js';

export const cardClickedHandler = (socketId, data) => {
  const { roomId } = data;
  const { position, currentPosition } = game[roomId];
  if (socketId === position.attack && currentPosition === 'attack') {
    return attackHandler(data);
  } else if (socketId === position.defense && currentPosition === 'defense') {
    return defenseHandler(data);
  }
};
