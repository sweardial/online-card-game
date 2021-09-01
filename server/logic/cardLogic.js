import { game } from "./gameInit.js";

import { gettingOpponentPlayerByUserId } from "./gettingPlayers.js";

export const deckGenerator = () => {
  const suits = ['hearts', 'spades', 'diamonds', 'clubs'];
  const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
  const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const allCards = [];
  let id = 1;

  for (let i = 0; i < 4; i++) {
    for (let y = 0; y < cards.length; y++) {
      allCards.push({ id: id++, card: cards[y], suit: suits[i], value: values[y] });
    }
  }
  allCards.sort(() => Math.random() - 0.5);
  return allCards;
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

export const removeCardFromUserDeck = (userId, roomId, cardToRemove) => {
  if (userId === game[roomId].firstPlayer) {
    game[roomId].firstPlayerDeck = game[roomId].firstPlayerDeck.filter(
      card => card.id !== cardToRemove.id
    );
  } else {
    game[roomId].secondPlayerDeck = game[roomId].secondPlayerDeck.filter(
      card => card.id !== cardToRemove.id
    );
  }
};


export const checkingTossingCards = (roomId, uid) => {
  const opponent = gettingOpponentPlayerByUserId(roomId, uid);
  const { attackingCards, defensiveCards } = game[roomId];
  for (let card in game[roomId][`${opponent}Deck`]) {
    if (
      possibleAttackingCard(attackingCards, defensiveCards, game[roomId][`${opponent}Deck`][card])
    )
      return true;
  }
  return false;
}; 

export const possibleDefensiveCard = (attackingCard, trumpSuit, defensiveCard) => {
  if (attackingCard.suit === defensiveCard.suit && attackingCard.value < defensiveCard.value) {
    return true;
  } else if (defensiveCard.suit === trumpSuit.suit && attackingCard.suit !== trumpSuit.suit) {
    return true;
  }
  return false;
};

export const possibleAttackingCard = (attackingArray, defensiveArray, card) => {
  const valueSet = new Set();
  attackingArray.map(el => valueSet.add(el.value));
  defensiveArray.map(el => valueSet.add(el.value));
  if (!valueSet.size || valueSet.has(card.value)) {
    return true;
  }
  return false;
};