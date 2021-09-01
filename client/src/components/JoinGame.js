import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, FormGroup, Button, Label, Input } from 'reactstrap';
import { userConnection, invalidSessionKey } from '../state/actions/actions';

const JoinGame = () => {
  const invalidKey = useSelector(state => state.connection.invalidSessionKey);
  const [username, setUsername] = useState('');
  const [sessionKey, setSessionKey] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    if (username && sessionKey) {
      dispatch(userConnection({ username, sessionKey }));
    }
  }

  return (
    <div className='session-page'>
      <Form>
        <FormGroup>
          <Label for='exampleEmail'>Your nickname</Label>
          <Input
            type='nickname'
            name='nickname'
            id='nickname'
            onChange={e => setUsername(e.target.value)}
          />
          {!username && submitted && <p style={{ color: 'red' }}>At least one character</p>}
        </FormGroup>
        <FormGroup>
          <Label for='sessionCode'>Friend's code</Label>
          <Input
            onChange={e => {
              dispatch(invalidSessionKey(false));
              setSessionKey(e.target.value);
            }}
            type='sessionCode'
            name='sessionCode'
            id='sessionCode'
          />
          {!sessionKey && submitted && <p style={{ color: 'red' }}>*Field is required</p>}
          {invalidKey && submitted && sessionKey.length && (
            <p style={{ color: 'red' }}> *Invalid code </p>
          )}
        </FormGroup>
        <br></br>
        <Button onClick={handleSubmit} size='sm' color='warning'>
          Join Session
        </Button>
      </Form>
    </div>
  );
};

export default JoinGame;
