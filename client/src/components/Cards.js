import { React, memo } from 'react';
import logo from '../cards-images/backcard.jpg';

const Cards = ({cards}) => {
  return cards.map((_, index) => (
    <div
      key={index}
      className='border border-dark'
      style={{
        width: '5rem',
        height: '8rem',
        position: 'absolute',
        marginTop: `${(index + 30) * 0.2}rem`,
        borderRadius: '10px',
        backgroundImage: `url(${logo})`,
        backgroundSize: '5rem 8rem',
        backgroundRepeat: 'no-repeat',
        marginRight: '-30px',
      }}></div>
  ));
};
const MemoCards = memo(Cards);
export default MemoCards;
