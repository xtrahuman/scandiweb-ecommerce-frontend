export const GET_PRODUCT_DATA = 'DATA/PRODUCT/GET';

const productDatafn = (payload) => (
  {
    type: GET_PRODUCT_DATA,
    payload,
  }
);

export default productDatafn;
