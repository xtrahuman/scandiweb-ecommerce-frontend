import { createStore, combineReducers, applyMiddleware} from 'redux';
import counter from './reducer';
import cartReducer from './currentImage/currentImage'
import logger from 'redux-logger';

const reducer = combineReducers({
  counter,
  cartReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(logger),
);

export default store;