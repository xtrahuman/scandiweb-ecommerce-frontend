import {GET_CART, ALL_COUNTER} from './actions'


const editCart = (state = [], action) => {
    switch (action.type) {
      case GET_CART:
        return action.payload;
      case ALL_COUNTER:
        return action.payload;
      default:
        return state;
    }
  };
  
  export default editCart;