const cardClickedHandler = (socketId, data) => {
  const { roomId } = data;
  const { position, currentPosition } = game[roomId];
  if (socketId === position.attack && currentPosition === 'attack') {
    return attackHandler(data);
  } else if (socketId === position.defense && currentPosition === 'defense') {
    return defenseHandler(data);
  }
};


const checkingTossingCards = (roomId, uid) => {
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

const grabbingAfterTossing = (roomId, uid) => {
  const opponent = gettingOpponentPlayerByUserId(roomId, uid);
  game[roomId][`${opponent}Deck`].push(
    ...game[roomId].attackingCards,
    ...game[roomId].defensiveCards
  );
};

const grabCardsHandler = (roomId, uid) => {
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


const grabbingEvent = roomId => {
  game[roomId].grabbing = true;
  game[roomId].currentPosition = 'attack';
};

const immidiateGrabbing = (roomId, uid) => {
  const player = gettingPlayerById(roomId, uid);
  game[roomId][`${player}Deck`].push(
    ...game[roomId].attackingCards,
    ...game[roomId].defensiveCards
  );
};


const attackHandler = ({ roomId, card, grabbing, uid }) => {
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

const doneAttackHandler = ({ roomId, uid }) => {
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
