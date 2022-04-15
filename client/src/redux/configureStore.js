import { createStore, combineReducers, applyMiddleware} from 'redux';
import counter from './reducer';
import logger from 'redux-logger';

const reducer = combineReducers({
  counter,
});

const store = createStore(
  reducer,
  applyMiddleware(logger),
);

export default store;