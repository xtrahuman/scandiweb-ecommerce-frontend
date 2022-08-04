import { ADD_TO_CART, UPDATE_CART } from './action';

const UploadCarts = (cart) => localStorage.setItem('allCart', JSON.stringify(cart));

const getCartFromStorage = () => JSON.parse(localStorage.getItem('allCart'));

const myCart = () => (!getCartFromStorage() ? [] : getCartFromStorage());

const initialState = myCart();

const allCart = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      UploadCarts([...state, ...action.payload]);
      return [...state, ...action.payload];
    case UPDATE_CART:
      UploadCarts(action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default allCart;
