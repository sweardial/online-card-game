import { game } from './gameInit.js';

export const winningCheck = (roomId, uid = '') => {
  const { cardDeck, firstPlayerDeck, secondPlayerDeck, firstPlayer, secondPlayer } = game[roomId];
  if (cardDeck.length === 0) {
    if (firstPlayerDeck.length === 0 && secondPlayerDeck.length > 1) {
      return firstPlayer;
    } else if (secondPlayerDeck.length === 0 && firstPlayerDeck.length > 1) {
      return secondPlayer;
    } else if (firstPlayerDeck.length === 0 && secondPlayerDeck.length === 0) {
      return 'tie';
    } else if (uid === firstPlayer) {
      if (firstPlayerDeck.length === 1 && secondPlayerDeck.length > 1) {
        return firstPlayer
      } 
    } else if (uid === secondPlayer) {
      if (secondPlayerDeck.length === 1 && firstPlayerDeck.length > 1) {
        return secondPlayer
      }
    }
  }
  return false;
};
