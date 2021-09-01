import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
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
        <Button
          outline
          style={{ marginTop: '5rem', width: 'fit-content' }}
          color='warning'
          size='sm'
          onClick={() => dispatch(grabCards(roomId, uid))}>
          Grab
        </Button>
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
