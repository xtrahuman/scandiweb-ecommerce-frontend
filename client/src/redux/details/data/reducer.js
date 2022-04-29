import { GET_PRODUCT_DATA } from './action';

const productData = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT_DATA:
      return action.payload;
    default:
      return state;
  }
};

export default productData;
