import React from 'react';
import { useSelector } from 'react-redux';
import TrumpSuit from './TrumpSuit';
import CardComponent from './Card';
import MemoCards from './Cards';

const Deck = () => {
  const cardsDeck = useSelector(state => state.cards.cardsDeck);
  const trumpCard = useSelector(state => state.cards.trumpCard);
  return (
    <div>
      {cardsDeck.length ? (
        <div className='deck'>
          <CardComponent props={trumpCard} deck={true} disabled={true}></CardComponent>
          {cardsDeck.length > 1 && <MemoCards cards={cardsDeck}></MemoCards>}
        </div>
      ) : (
        <div>
          <TrumpSuit></TrumpSuit>
        </div>
      )}
    </div>
  );
};

export default Deck;
