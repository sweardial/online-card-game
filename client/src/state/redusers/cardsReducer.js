import {
  SET_ATTACKING_CARDS,
  SET_DEFENSIVE_CARDS,
  SUCCESSFUL_DEFENSE,
  FILL_MY_DECK,
  FILL_OPPONENT_DECK,
  DELETE_OPPONENT_CARD,
  DELETE_USER_CARD,
  SET_DECK,
  SET_TRUMP_CARD,
  GRABBING_EVENT,
  GAME_OVER,
} from '../actions/actions';

const initialState = {
  userDeck: [],
  opponentDeck: [],
  attackingCards: [],
  defensiveCards: [],
  cardsDeck: [],
  successfulDefense: [],
  trumpCard: '',
  grabbing: false,
  gameOver: false,
};

const cardsReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case SET_ATTACKING_CARDS:
      return { ...state, attackingCards: [...action.payload] };
    case SET_DEFENSIVE_CARDS:
      return { ...state, defensiveCards: [...action.payload] };
    case SUCCESSFUL_DEFENSE:
      return { ...state, successfulDefense: [...state['successfulDefense'], ...action.payload] };
    case FILL_MY_DECK:
      return { ...state, userDeck: [...action.payload] };
    case FILL_OPPONENT_DECK:
      return { ...state, opponentDeck: [...action.payload] };
    case DELETE_USER_CARD:
      return { ...state, userDeck: state['userDeck'].filter(el => el.id !== action.payload.id) };
    case DELETE_OPPONENT_CARD:
      return {
        ...state,
        opponentDeck: state['opponentDeck'].filter(
          (_, index) => index !== state['opponentDeck'].length - 1
        ),
      };
    case SET_DECK:
      return { ...state, cardsDeck: [...action.payload] };
    case SET_TRUMP_CARD:
      return { ...state, trumpCard: action.payload };
    case GRABBING_EVENT:
      return { ...state, grabbing: action.payload };
    case GAME_OVER:
      return { ...state, gameOver: action.payload };
    default:
      return state;
  }
};

export default cardsReducer;
