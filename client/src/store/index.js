import { createStore, combineReducers } from 'redux';

import roomsReducer from './rooms';

let reducers = combineReducers({
  rooms: roomsReducer,
});

const store = () => {
  return createStore(reducers);
};

export default store;
