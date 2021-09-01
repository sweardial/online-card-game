import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { doneAttack } from '../state/actions/actions';
import './styles/mainfield.css'

const AttackingUserAction = () => {
  const grabbing = useSelector(state => state.cards.grabbing);
  const attackingCards = useSelector(state => state.cards.attackingCards);
  const defensiveCards = useSelector(state => state.cards.defensiveCards);
  const roomId = useSelector(state => state.id.roomId);
  const uid = useSelector(state => state.id.uid);
  const dispatch = useDispatch()

  return (
    <div className='actions'>
      {grabbing ||
      (attackingCards.length !== 0 && attackingCards.length === defensiveCards.length) ? (
        <Button
          outline
          onClick={() => dispatch(doneAttack(roomId, uid))}
          style={{ marginTop: '5rem', width: 'fit-content' }}
          color='warning'
          size='sm'>
          Done
        </Button>
      ) : (
        <div style={{ marginTop: '6rem' }}></div>
      )}
      {attackingCards.length ? (
        <p className='hint'>
          {grabbing && 'User is grabbing cards. Toss in the cards if you have some.'}
          {!grabbing && 'Throw cards with the same values as you see on the table.'}
        </p>
      ) : (
        <p className='hint'>Your turn</p>
      )}
    </div>
  );
};

export default AttackingUserAction;
