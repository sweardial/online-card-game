import React from 'react';
import Loader from './Loader';
import { useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import waitingOpponent from '../cards-images/waitingOpponent.png'
import '../App.css'

const Lobby = () => {
  const opponentType = useSelector(state => state.connection.opponentType);
  const sessionKey = useSelector(state => state.id.sessionKey);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div>
        <img className='waitingOpponent' src={waitingOpponent} alt='waitingOpponent'></img>
      </div>
      <Loader></Loader>
      {opponentType === 'friend' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
          <br></br>
          <br></br>
          <br></br>
          <h5 style={{color: 'white'}}>Click to Copy Session Code and send it to your friend:</h5>

          <Button
            onClick={() => {
              navigator.clipboard.writeText(sessionKey);
            }}>
            {sessionKey}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Lobby;
