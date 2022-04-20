import { createStore, combineReducers, applyMiddleware} from 'redux';
import counter from './reducer';
import cartReducer from './currentImage/currentImage'
import categoryReducer from './category/reducer';
import productReducer  from './details/reducer'
import logger from 'redux-logger';

const reducer = combineReducers({
  counter,
  cartReducer,
  categoryReducer,
  productReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(logger),
);

export default store;