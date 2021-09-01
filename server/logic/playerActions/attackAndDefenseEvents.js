import { game } from '../gameInit.js';

import {
  removeCardFromUserDeck,
  fillingUsersCards,
  possibleDefensiveCard,
  possibleAttackingCard,
} from '../cardLogic.js';
import { switchingPlayersPositions } from '../settingGameLogic.js';
import { grabCardsHandler } from './grabbingEvents.js';

export const attackHandler = ({ roomId, card, grabbing, uid }) => {
  const { attackingCards, defensiveCards } = game[roomId];
  const result = possibleAttackingCard(attackingCards, defensiveCards, card);
  if (result) {
    if (!grabbing) {
      game[roomId].currentPosition = 'defense';
    }
    removeCardFromUserDeck(uid, roomId, card);
    attackingCards.push(card);
    return ['attacking cards', card, attackingCards, uid];
  }
};

export const doneAttackHandler = ({ roomId, uid }) => {
  const { cardDeck, firstPlayer, firstPlayerDeck, secondPlayerDeck } = game[roomId];
  if (!game[roomId].grabbing) {
    switchingPlayersPositions(roomId);
    fillingUsersCards(false, roomId);
    game[roomId].attackingCards = [];
    game[roomId].defensiveCards = [];
    return ['fill cards', firstPlayer, cardDeck, firstPlayerDeck, secondPlayerDeck];
  }
  return grabCardsHandler(roomId, uid);
};

export const defenseHandler = ({ card, roomId, uid }) => {
  const { attackingCards, defensiveCards, trumpSuit } = game[roomId];
  const lastCard = attackingCards.length - 1;
  const result = possibleDefensiveCard(attackingCards[lastCard], trumpSuit, card);
  if (result) {
    removeCardFromUserDeck(uid, roomId, card);
    defensiveCards.push(card);
    game[roomId].currentPosition = 'attack';
    return ['defensive cards', card, defensiveCards, uid];
  }
};
