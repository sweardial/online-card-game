import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';

const GameOver = () => {
  const gameOver = useSelector(state => state.cards.gameOver);
  const uid = useSelector(state => state.id.uid);

  const winningMessage = () => {
    if (gameOver === 'tie') {
      return 'TIE';
    } else if (gameOver === uid) {
      return 'YOU WON';
    } else {
      return 'YOU LOSE';
    }
  };

  const refreshPage = () => {
    return window.location.reload();
  };

  return (
    <Modal isOpen={true}>
      <ModalHeader>
        <h2 style={{ color: 'red' }}>GAME OVER</h2>
      </ModalHeader>
      <ModalBody>
        {winningMessage()}
        <br></br>
        <br></br>
        <Button color='warning' size='sm' onClick={refreshPage}>
          Back to the main screen
        </Button>
      </ModalBody>
    </Modal>
  );
};

export default GameOver;
