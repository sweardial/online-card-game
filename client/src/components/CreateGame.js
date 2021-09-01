import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, InputGroup, Button, Label, FormGroup } from 'reactstrap';
import { enterWaitingLobby, settingOpponentType, userConnection } from '../state/actions/actions';

const CreateGame = () => {
  const [username, setUsername] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [opponentType, setOpponentType] = useState('');
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    if (username && opponentType) {
      dispatch(userConnection({username, opponentType}));
      dispatch(enterWaitingLobby(true));
      dispatch(settingOpponentType(opponentType))
      
    }
  }
  return (
    <div>
      {(!username || !opponentType || !submitted || (username && opponentType)) && (
        <div>
          <InputGroup style={{ width: '95%', margin: '0 0 15px 0' }}>
            <Input
              onChange={e => {
                setUsername(e.target.value);
                setSubmitted(false);
              }}
              name='name'
              placeholder='username'
            />
          </InputGroup>
          {!username && submitted && <p style={{ color: 'red' }}>*At least one character</p>}
          <FormGroup check>
            <Label check>
              <Input
                type='radio'
                name='opponentType'
                value='random'
                onChange={e => setOpponentType(e.target.value)}
              />
              Play with a random player
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type='radio'
                name='opponentType'
                value='friend'
                onChange={e => setOpponentType(e.target.value)}
              />
              Play with a friend
            </Label>
          </FormGroup>
          {!opponentType && submitted && <p style={{ color: 'red' }}>Choose one</p>}
          <Button color='warning' size='sm' onClick={handleSubmit}>
            Create
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreateGame;
