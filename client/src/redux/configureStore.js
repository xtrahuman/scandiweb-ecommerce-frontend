import { createStore, combineReducers, applyMiddleware} from 'redux';
import counter from './reducer';
import cartReducer from './currentImage/currentImage'
import categoryReducer from './category/reducer';
import productReducer  from './details/reducer'
import itemReducer from './cartItems/reducer';
import logger from 'redux-logger';

const reducer = combineReducers({
  counter,
  cartReducer,
  categoryReducer,
  productReducer,
  itemReducer: itemReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(logger),
);

export default store;