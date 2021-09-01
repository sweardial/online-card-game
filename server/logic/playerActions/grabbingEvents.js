import { game } from '../gameInit.js';
import { fillingUsersCards } from '../settingGameLogic.js';
import { gettingOpponentPlayerByUserId, gettingPlayerById} from '../gettingPlayers.js';


export const grabbingAfterTossing = (roomId, uid) => {
  const opponent = gettingOpponentPlayerByUserId(roomId, uid);
  game[roomId][`${opponent}Deck`].push(
    ...game[roomId].attackingCards,
    ...game[roomId].defensiveCards
  );
};

export const grabCardsHandler = (roomId, uid) => {
  const { cardDeck, firstPlayer, firstPlayerDeck, secondPlayerDeck } = game[roomId];
  if (game[roomId].grabbing) {
    grabbingAfterTossing(roomId, uid);
  } else {
    immidiateGrabbing(roomId, uid);
  }
  game[roomId].attackingCards = [];
  game[roomId].defensiveCards = [];
  game[roomId].currentPosition = 'attack';
  game[roomId].grabbing = false;
  fillingUsersCards(false, roomId);
  return ['grab cards', firstPlayer, cardDeck, firstPlayerDeck, secondPlayerDeck];
};

export const grabbingEvent = roomId => {
  game[roomId].grabbing = true;
  game[roomId].currentPosition = 'attack';
};

export const immidiateGrabbing = (roomId, uid) => {
  const player = gettingPlayerById(roomId, uid);
  game[roomId][`${player}Deck`].push(
    ...game[roomId].attackingCards,
    ...game[roomId].defensiveCards
  );
};
