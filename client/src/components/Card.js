import React, { useState } from 'react';
import './styles/card.css';
import { useSelector, useDispatch } from 'react-redux';
import { cardClicked } from '../state/actions/actions';

const CardComponent = ({ props, disabled, deck }) => {
  const dispatch = useDispatch();
  const roomId = useSelector(state => state.id.roomId);
  const uid = useSelector(state => state.id.uid)
  const grabbing = useSelector(state => state.cards.grabbing)
  console.log(grabbing)
  
  const [mouseOver, setMouseOver] = useState(false);

  const className = `${props.suit}${props.card}`;
  return (
    <div
      style={
        disabled && deck
          ? { margin: '0 -30px 0 0' }
          : disabled && !deck
          ? { margin: '0 5px 0 0' }
          : mouseOver
          ? { margin: '0 -30px 0 0' }
          : { margin: '1rem -30px 0 0' }
      }
      key={props.id}
      className={mouseOver? `card ${className} border border-danger` :`card ${className} border border-dark`}
      onClick={() => {
        !disabled && dispatch(cardClicked(props, roomId, grabbing, uid)) ;
      }}
      onMouseOver={() => setMouseOver(true)}
      onMouseOut={() => setMouseOver(false)}></div>
  );
};

export default CardComponent;
