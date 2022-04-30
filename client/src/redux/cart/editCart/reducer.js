import {
  UPDATE_IMAGE, GET_CART, ALL_COUNTER, SWITCH_ATTRIBUTE, DELETE_ITEM
} from './actions';

const editCart = (state = [], action) => {
  switch (action.type) {
    case GET_CART:
      return action.payload;
    case ALL_COUNTER:
      return action.payload;
    case SWITCH_ATTRIBUTE:
      return action.payload;
    case UPDATE_IMAGE:
      return action.payload;
    case DELETE_ITEM:
      return action.payload;
    default:
      return state;
  }
};

export default editCart;
