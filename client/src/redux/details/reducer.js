import { GETPRODUCT, GET_PRODUCT_DATA } from './action';
import { PRODUCT_QUERY } from '../queries/queries';

const productReducer = (state = PRODUCT_QUERY(''), action) => {
  switch (action.type) {
    case GETPRODUCT:
      return PRODUCT_QUERY(action.payload);
    default:
      return state;
  }
};

export const productData = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT_DATA:
      return action.payload;
    default:
      return state;
  }
};

export default productReducer;
