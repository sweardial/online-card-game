import React from 'react';
import { useSelector } from 'react-redux';
import CardComponent from './Card';
import './styles/battlefield.css';

const Battlefield = () => {
  // const ad = useSelector(state => state.ad)
  // const dd = useSelector(state => state.dd)
  const attackingCards = useSelector(state => state.cards.attackingCards)
  const defensiveCards = useSelector(state => state.cards.defensiveCards)
  return (
    <div className='battlefield'>
      <div className='attackingPosition'>
        {attackingCards.map(el => <CardComponent props={el} disabled={true} ></CardComponent>)}
      </div>
      <div className='defendingPosition'>
        {defensiveCards.map(el => <CardComponent props={el} disabled={true}></CardComponent>)}
      </div>

    </div>
  )
};

export default Battlefield;
