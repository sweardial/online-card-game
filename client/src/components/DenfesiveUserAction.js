import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { grabCards } from '../state/actions/actions';
import './styles/mainfield.css'

const DefensiveUserAction = () => {
  const grabbing = useSelector(state => state.cards.grabbing);
  const attackingCards = useSelector(state => state.cards.attackingCards);
  const defensiveCards = useSelector(state => state.cards.defensiveCards);
  const roomId = useSelector(state => state.id.roomId);
  const uid = useSelector(state => state.id.uid);
  const dispatch = useDispatch()

  return (
    <div className='actions'>
      {attackingCards.length > defensiveCards.length && !grabbing ? (
        <button
          className='btn--action'
          onClick={() => dispatch(grabCards(roomId, uid))}>
          Grab
        </button>
      ) : (
        <div style={{ marginTop: '6rem' }}></div>
      )}
      <p className='hint'>
        {attackingCards.length === defensiveCards.length
          ? "Opponent's turn"
          : grabbing
          ? 'Waiting for all cards'
          : "Grab cards if you can't beat them"}
      </p>
    </div>
  );
};

export default DefensiveUserAction;
