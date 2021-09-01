import {
  SET_GAME_ID,
  SET_ATTACKING_USER,
  SET_DEFENSIVE_USER,
  SET_USER_ID,
  SET_SESSION_KEY,
} from '../actions/actions';

const initialState = {
  uid: '',
  attackingUid: '',
  defensiveUid: '',
  roomId: '',
  sessionKey: '',
};

const idReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case SET_GAME_ID:
      return { ...state, roomId: action.payload };
    case SET_ATTACKING_USER:
      return { ...state, attackingUid: action.payload };
    case SET_DEFENSIVE_USER:
      return { ...state, defensiveUid: action.payload };
    case SET_USER_ID:
      return { ...state, uid: action.payload };
    case SET_SESSION_KEY:
      return { ...state, sessionKey: action.payload };
    default:
      return state;
  }
};

export default idReducer;
