import { DISPLAY_DELETE, GET_INDEX, TOGGLE_CART, TOGGLE_DROP_DOWN } from './action';

const miniCartActive = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_CART:
      return !state;
    default:
      return state;
  }
};

export const dropDownActive = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_DROP_DOWN:
      return !state;
    default:
      return state;
  }
};

export const deleteDisplay = (state = false, action) => {
  switch (action.type) {
    case DISPLAY_DELETE:
      return !state;
    default:
      return state;
  }
};

export const getIndex = (state = null, action) => {
  switch (action.type) {
    case GET_INDEX:
      return action.payload;
    default:
      return state;
  }
};

export default miniCartActive;
