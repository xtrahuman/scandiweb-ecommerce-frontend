import { createStore, combineReducers, applyMiddleware} from 'redux';
import editCart from './cart/editCart/reducer';
import cartReducer from './currentImage/currentImage'
import categoryReducer from './category/reducer';
import productReducer  from './details/query/reducer'
import itemReducer from './Item/reducer';
import productData from './details/data/action';
import miniCartActive, { dropDownActive } from './display/reducer';
import allCart from './cart/addCart/reducer';
import logger from 'redux-logger';

const reducer = combineReducers({
  editCart,
  cartReducer,
  categoryReducer,
  productReducer,
  productData,
  allCart,
  miniCartActive,
  dropDownActive,
  itemReducer: itemReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(logger),
);

export default store;