import {React, memo} from 'react';
import './styles/card.css';

const BackCard = ({ cards }) => {
  return (
    <div style={{display:'flex', marginTop: '-3rem'}}>
      {cards.map((_, index)=> <div key={index} className='card backcard border-dark rounded'></div>)}
    </div>
  )
};

const MemoBackCard = memo(BackCard)

export default MemoBackCard;
