import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '../App.css';
import { Redirect } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import CreateGame from './CreateGame';
import JoinGame from './JoinGame';

import Rules from './Rules';
import welcomeImage from '../cards-images/welcomeImage.png';
import Lobby from './Lobby';

const StartInputField = () => {
  const roomId = useSelector(state => state.id.roomId);
  const lobby = useSelector(state => state.connection.lobby);
  const connectionError = useSelector(state => state.connection.connectionError)

  const [modal_create, setModal_create] = useState(false);
  const [modal_join, setModal_join] = useState(false);
  const [modal_rules, setModal_rules] = useState(false);

  const create_toggle = () => setModal_create(!modal_create);
  const join_toggle = () => setModal_join(!modal_join);
  const rules_toggle = () => setModal_rules(!modal_rules);
  return (
    <div>
      {!lobby ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img className='welcomeImage' src={welcomeImage} alt='welcomeImage'></img>
          <button className='btn--custom' onClick={create_toggle}>
            Create game
          </button>
          <Modal isOpen={modal_create} toggle={create_toggle}>
            <ModalHeader toggle={create_toggle}>Enter:</ModalHeader>
            <ModalBody>
              <CreateGame></CreateGame>
            </ModalBody>
          </Modal>
          <br></br>
          <button className='btn--custom' onClick={join_toggle}>
            Join game
          </button>
          <Modal isOpen={modal_join} toggle={join_toggle}>
            <ModalHeader toggle={join_toggle}>Enter: </ModalHeader>
            <ModalBody>
              <JoinGame></JoinGame>
            </ModalBody>
          </Modal>
          <br></br>
          <button className='btn--custom' onClick={rules_toggle}>
            Read the rules
          </button>
          <Modal isOpen={modal_rules} toggle={rules_toggle}>
            <ModalHeader toggle={rules_toggle}>Game rules: </ModalHeader>
            <ModalBody>
              <Rules></Rules>
            </ModalBody>
          </Modal>
        </div>
      ) : (
        <Lobby></Lobby>
      )}
      {roomId && <Redirect to={roomId} />}
      {connectionError && alert('Connection error occured')}
    </div>
  );
};

export default StartInputField;
