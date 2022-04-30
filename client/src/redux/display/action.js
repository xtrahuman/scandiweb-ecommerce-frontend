export const TOGGLE_CART = 'NAVBAR/TOGGLE/CART';
export const TOGGLE_DROP_DOWN = 'NAVBAR/TOGGLE/DROPDOWN';
export const DISPLAY_DELETE = 'CART/DISPLAY/DELETE';

const toggleMiniCart = () => ({
  type: TOGGLE_CART,
});

export const toggleDropdown = () => ({
  type: TOGGLE_DROP_DOWN,
});

export const displayDelete = () => ({
  type: DISPLAY_DELETE,
});

export default toggleMiniCart;
