import React from 'react';
import { useSelector } from 'react-redux';
import './styles/mainfield.css';
import clubs from '../cards-images/clubs.jpg';
import hearts from '../cards-images/hearts.jpg';
import diamonds from '../cards-images/diamonds.jpg';
import spades from '../cards-images/spades.jpg';

const trumpSuitImgDetermination = trumpSuit => {
  if (trumpSuit === 'clubs') return clubs;
  if (trumpSuit === 'hearts') return hearts;
  if (trumpSuit === 'diamonds') return diamonds;
  if (trumpSuit === 'spades') return spades;
};

const TrumpSuit = () => {
  const trumpSuit = useSelector(state => state.cards.trumpCard.suit);
  const src = trumpSuitImgDetermination(trumpSuit)
  return (
    <div className='deck'>
      <img className='trumpSuit' src={src} alt='trumpSuit'></img>
    </div>
  );
};

export default TrumpSuit;
