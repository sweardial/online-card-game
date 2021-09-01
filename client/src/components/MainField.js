import React from 'react';
import { useSelector } from 'react-redux';

import './styles/mainfield.css';

import MemoBackCard from './Backkard';
import Battlefield from './Battlefield';
import MemoUserDeck from './UserDeck';
import Action from './Action';
import Deck from './Deck';
import SuccessfulDefense from './SuccessfulDefense';
import GameOver from './GameOver';


const MainField = () => {
  const opponentDeck = useSelector(state => state.cards.opponentDeck);
  const userDeck = useSelector(state => state.cards.userDeck);
  const gameOver = useSelector(state => state.cards.gameOver)

  return (
    <div className='mainField'>
      <Deck></Deck>
      <div className='field'>
        <MemoBackCard cards={opponentDeck}></MemoBackCard>
        <Battlefield></Battlefield>
        <MemoUserDeck cards={userDeck}></MemoUserDeck>
        <Action></Action>
      </div>
      <SuccessfulDefense></SuccessfulDefense>
      {gameOver && <GameOver></GameOver>}
    </div>
  );
};

export default MainField;
