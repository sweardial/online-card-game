import { React, memo } from 'react';
import CardComponent from './Card';

import './styles/userDeck.css';

const UserDeck = ({ cards }) => {
  return (
    <div className='userDeck'>
      {cards.map((card, id) => (
        <CardComponent props={card} key={id} disabled={false}></CardComponent>
      ))}
    </div>
  );
};

const MemoUserDeck = memo(UserDeck)
export default MemoUserDeck;
