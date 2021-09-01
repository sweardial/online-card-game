import init from '../../socket';
import * as actions from '../actions/actions';

import { CARD_CLICKED, GRAB_CARDS, DONE_ATTACK, NEW_CONNECTION } from '../actions/actions';

const connectionMiddleWare = store => next => action => {
  const roomJoinedHandler = (socketId, roomId, data) => {
    store.dispatch(actions.setTrumpCard(data.cardDeck[0]));
    store.dispatch(actions.setAttackingUser(data.position.attack));
    store.dispatch(actions.setDefensingUser(data.position.defense));
    store.dispatch(actions.setDeck(data.cardDeck));
    if (socketId === data.firstPlayer) {
      store.dispatch(actions.setUserId(data.firstPlayer));
      store.dispatch(actions.fillMyDeck(data.firstPlayerDeck));
      store.dispatch(actions.fillOpponentDeck(new Array(6).fill(0)));
    } else {
      store.dispatch(actions.setUserId(data.secondPlayer));
      store.dispatch(actions.fillMyDeck(data.secondPlayerDeck));
      store.dispatch(actions.fillOpponentDeck(new Array(6).fill(0)));
    }
    setTimeout(() => {
      store.dispatch(actions.setGameId(roomId));
    }, 2000);
  };

  const attackingCardsHandler = (card, attackingCards, id) => {
    const myId = store.getState().id.uid;
    if (myId === id) {
      store.dispatch(actions.deleteOneCard(card));
    } else {
      store.dispatch(actions.deleteOpponentCard());
    }
    store.dispatch(actions.setAttackingCards(attackingCards));
  };

  const successfulDefense = () => {
    const attackingUid = store.getState().id.attackingUid;
    const defensiveUid = store.getState().id.defensiveUid;
    const attackingCards = store.getState().cards.attackingCards;
    const defensiveCards = store.getState().cards.defensiveCards;
    store.dispatch(actions.setSuccessfulDefense([...attackingCards, ...defensiveCards]));
    store.dispatch(actions.setAttackingCards([]));
    store.dispatch(actions.setDefensiveCards([]));
    store.dispatch(actions.setAttackingUser(defensiveUid));
    store.dispatch(actions.setDefensingUser(attackingUid));
  };

  const defensiveCardsHandler = (card, defensiveCards, id) => {
    const myId = store.getState().id.uid;
    if (myId === id) {
      store.dispatch(actions.deleteOneCard(card));
    } else {
      store.dispatch(actions.deleteOpponentCard());
    }
    store.dispatch(actions.setDefensiveCards(defensiveCards));
  };

  const disconnectionHandler = () => {
    const gameOver = store.getState().cards.gameOver;
    if (!gameOver) {
      alert('Your opponent has been disconnected');
      window.location.reload();
    }
  };

  const sessionKeyHandler = key => {
    store.dispatch(actions.setSessionKey(key));
  };

  const grabCardsHandler = (firstPlayerID, cardDeck, firstPlayerDeck, secondPlayerDeck) => {
    const myId = store.getState().id.uid;
    store.dispatch(actions.setDeck(cardDeck));
    store.dispatch(actions.setAttackingCards([]));
    store.dispatch(actions.setDefensiveCards([]));
    if (myId === firstPlayerID) {
      store.dispatch(actions.fillMyDeck(firstPlayerDeck));
      store.dispatch(actions.fillOpponentDeck(new Array(secondPlayerDeck.length).fill(0)));
    } else {
      store.dispatch(actions.fillMyDeck(secondPlayerDeck));
      store.dispatch(actions.fillOpponentDeck(new Array(firstPlayerDeck.length).fill(0)));
    }
  };

  const fillCardsHandler = (firstPlayerID, cardDeck, firstPlayerDeck, secondPlayerDeck) => {
    const myId = store.getState().id.uid;
    store.dispatch(actions.setDeck(cardDeck));
    successfulDefense();
    if (myId === firstPlayerID) {
      store.dispatch(actions.fillMyDeck(firstPlayerDeck));
      store.dispatch(actions.fillOpponentDeck(new Array(secondPlayerDeck.length).fill(0)));
    } else {
      store.dispatch(actions.fillMyDeck(secondPlayerDeck));
      store.dispatch(actions.fillOpponentDeck(new Array(firstPlayerDeck.length).fill(0)));
    }
  };


  const socket = init()

  switch (action.type) {
    case NEW_CONNECTION:
      socket.emit('new connection', action.payload);

      socket.on('room joined', (roomId, data) => {
        roomJoinedHandler(socket.id, roomId, data);
      });

      socket.on('attacking cards', (card, attackingCards, id) => {
        attackingCardsHandler(card, attackingCards, id);
      });

      socket.on('defensive cards', (card, defensiveCards, id) => {
        defensiveCardsHandler(card, defensiveCards, id);
      });

      socket.on('session key', key => {
        sessionKeyHandler(key);
      });

      socket.on('valid code', () => {
        store.dispatch(actions.enterWaitingLobby(true));
      });

      socket.on('invalid code', () => {
        store.dispatch(actions.invalidSessionKey(true));
      });

      socket.on('opponent disconnection', () => {
        disconnectionHandler();
      });

      socket.on('user is grabbing', () => {
        store.dispatch(actions.grabbingEvent(true));
      });

      socket.on('game over', data => {
        store.dispatch(actions.gameOver(data));
      });

      socket.on('fill cards', (firstPlayerID, cardDeck, firstPlayerDeck, secondPlayerDeck) => {
        store.dispatch(actions.grabbingEvent(false));
        fillCardsHandler(firstPlayerID, cardDeck, firstPlayerDeck, secondPlayerDeck);
      });

      socket.on('grab cards', (firstPlayerID, cardDeck, firstPlayerDeck, secondPlayerDeck) => {
        store.dispatch(actions.grabbingEvent(false));
        grabCardsHandler(firstPlayerID, cardDeck, firstPlayerDeck, secondPlayerDeck);
      });

      break;
    case CARD_CLICKED:
      socket.emit('card clicked', action.payload);
      break;
    case DONE_ATTACK:
      socket.emit('done attack', action.payload);
      break;
    case GRAB_CARDS:
      socket.emit('grab cards', action.payload);
      break;
    default:
      return next(action);
  }
};

export default connectionMiddleWare;
