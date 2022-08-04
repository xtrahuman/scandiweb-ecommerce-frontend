export const TOGGLE_CART = 'NAVBAR/TOGGLE/CART';
export const TOGGLE_DROP_DOWN = 'NAVBAR/TOGGLE/DROPDOWN';
export const DISPLAY_DELETE = 'CART/DISPLAY/DELETE';
export const GET_INDEX = 'CART/ITEM/INDEX';

const toggleMiniCart = () => ({
  type: TOGGLE_CART,
});

export const toggleDropdown = () => ({
  type: TOGGLE_DROP_DOWN,
});

export const setIndex = (payload) => ({
  type: GET_INDEX,
  payload,
});

export const displayDelete = () => ({
  type: DISPLAY_DELETE,
});

export default toggleMiniCart;
