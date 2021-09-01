import React from 'react';
import './styles/card.css';

const BattlefieldCard = ({ props }) => {
  const className = `${props.suit}${props.card}`;
  return <div id={props.id} className={`card ${className}`}></div>;
};

export default BattlefieldCard;
