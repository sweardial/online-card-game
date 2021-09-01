import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';

import connectionMiddleWare from '../middleWare/middleWare';

import cardsReducer from './cardsReducer';
import idReducer from './idReducer';
import connectionReducer from './connectionReducer';

const allReducers = combineReducers({
  cards: cardsReducer,
  id: idReducer,
  connection: connectionReducer,
});


const store = createStore(allReducers, applyMiddleware(connectionMiddleWare));

export default store;
