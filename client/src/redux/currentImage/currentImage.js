const SELECTIMAGE = 'GALLERY/CURRENTIMAGE/SELECTIMAGE';

export const selectImage = (payload) => (
  {
    type: SELECTIMAGE,
    payload,
  }
);

const UploadProductImage = (prod) => localStorage.setItem('current_prod_img', JSON.stringify(prod));

const currentProdutImage = () => JSON.parse(localStorage.getItem('current_prod_img'));

let initialState = currentProdutImage();

if (!currentProdutImage) {
  initialState = {};
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECTIMAGE:
      UploadProductImage(action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default cartReducer;
