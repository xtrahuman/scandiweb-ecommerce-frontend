export const ALL_COUNTER = 'CART/ITEMS/COUNTER';
export const GET_CART = 'CART/ITEMS/GET';
export const UPDATE_IMAGE = 'CART/ITEMS/IMAGE';
export const SWITCH_ATTRIBUTE = 'CART/ITEMS/ATTRIBUTES/SWITCH';

export const getCartToEdit = (payload) => ({
  type: GET_CART,
  payload,
});

const allCounter = (cartData, sign, index, updateCart) => {
  const data = cartData.slice();
  if (sign === 'add') {
    data[index].count += 1;
  } else if (data[index].count > 0 && sign === 'substract') {
    data[index].count -= 1;
  }

  data[index].total = data[index].count * data[index].price;

  updateCart(data);

  return {
    type: ALL_COUNTER,
    payload: data,
  };
};

export const switchAttrib = (data, index, attribName, value, updateCart) => {
  const assign = (obj, keyPath, value) => {
    const lastKeyIndex = keyPath.length - 1;
    for (let i = 0; i < lastKeyIndex; i += 1) {
      const key = keyPath[i];
      if (!(key in obj)) {
        obj[key] = {};
      }
      obj = obj[key];
    }
    obj[keyPath[lastKeyIndex]] = value;
  };
  assign(data[index], [attribName], value);
  updateCart(data);

  return {
    type: SWITCH_ATTRIBUTE,
    payload: data,
  };
};

export const updateImage = (cartData, indx, updateCart) => {
  const data = cartData.slice();
  const { currentGallery } = data[indx].galleries;
  const { gallery } = data[indx].galleries;
  const l = gallery.length;
  let index;
  if (gallery !== undefined) {
    index = gallery.findIndex((gallery) => gallery === currentGallery);
  }
  let nextIndex = 0;
  if (index < l - 1) {
    nextIndex = index + 1;
  } else {
    nextIndex = 0;
  }
  data[indx].galleries.currentGallery = gallery[nextIndex];

  updateCart(data);

  return {
    type: UPDATE_IMAGE,
    payload: data,
  };
};

export default allCounter;
