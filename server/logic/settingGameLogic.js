import { game } from './gameInit.js';
import { deckGenerator } from './cardLogic.js'

export const settingGame = (roomId, firstPlayer, secondPlayer) => {
  game[roomId] = {};
  game[roomId].firstPlayer = firstPlayer;
  game[roomId].secondPlayer = secondPlayer;
  game[roomId].firstPlayerDeck = [];
  game[roomId].secondPlayerDeck = [];
  game[roomId].attackingCards = [];
  game[roomId].defensiveCards = [];
  game[roomId].trumpSuit = {};
  game[roomId].position = {};
  game[roomId].currentPosition = 'attack';
  game[roomId].grabbing = false;
  game[roomId].cardDeck = deckGenerator().slice(0, 15);
  return fillingUsersCards(true, roomId);
};


export const fillingUsersCards = (gameStart, roomId) => {
  for (let i = game[roomId].firstPlayerDeck.length; i < 6 && game[roomId].cardDeck.length; i++) {
    game[roomId].firstPlayerDeck.push(game[roomId].cardDeck.pop());
  }
  for (let i = game[roomId].secondPlayerDeck.length; i < 6 && game[roomId].cardDeck.length; i++) {
    game[roomId].secondPlayerDeck.push(game[roomId].cardDeck.pop());
  }
  if (gameStart) return settingPlayersPositions(roomId);
};

const settingPlayersPositions = roomId => {
  const randomPlayer = [game[roomId].firstPlayer, game[roomId].secondPlayer].sort(
    () => Math.random() - 0.5
  );
  game[roomId].position.attack = randomPlayer[0];
  game[roomId].position.defense = randomPlayer[1];
  return setTrumpCard(roomId);
};


const setTrumpCard = roomId => {
  game[roomId].trumpSuit = game[roomId].cardDeck[0];
};

export const switchingPlayersPositions = roomId => {
  [game[roomId].position.attack, game[roomId].position.defense] = [
    game[roomId].position.defense,
    game[roomId].position.attack,
  ];
};

