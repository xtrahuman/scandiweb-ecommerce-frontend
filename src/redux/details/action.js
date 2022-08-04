export const GET_PRODUCT_DATA = 'DATA/PRODUCT/GET';
export const GETPRODUCT = 'CATEGORY/CURRENTPRODUCT/GET';

export const fetchProduct = (payload) => (
  {
    type: GETPRODUCT,
    payload,
  }
);

const productDatafn = (payload) => (
  {
    type: GET_PRODUCT_DATA,
    payload,
  }
);

export default productDatafn;
