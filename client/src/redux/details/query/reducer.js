import { GETPRODUCT, PRODUCT_QUERY } from './action';

const productReducer = (state = PRODUCT_QUERY('apple-imac-2021'), action) => {
  switch (action.type) {
    case GETPRODUCT:
      return PRODUCT_QUERY(action.payload);
    default:
      return state;
  }
};

export default productReducer;
