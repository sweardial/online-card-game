import { ENTER_WAITING_LOBBY, SET_OPPONENT_TYPE, INVALID_SESSION_KEY } from '../actions/actions';

const initialState = {
  lobby: false,
  opponentType: '',
  invalidSessionKey: false,
};

const connectionReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case ENTER_WAITING_LOBBY:
      return { ...state, lobby: true };
    case SET_OPPONENT_TYPE:
      return { ...state, opponentType: action.payload };
    case INVALID_SESSION_KEY:
      return { ...state, invalidSessionKey: action.payload };
    default:
      return state;
  }
};

export default connectionReducer;
