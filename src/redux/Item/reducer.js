import { GETPRODUCT, ADDATTRIBUTES } from './action';

const itemReducer = (state = {}, action) => {
  switch (action.type) {
    case GETPRODUCT:
      return action.payload;
    case ADDATTRIBUTES:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default itemReducer;
