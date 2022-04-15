import {ADD, DECREASE} from './actions'

const counter = (state = 10, action) => {
    switch (action.type) {
      case ADD:
        return state + 1;
      case DECREASE:
        return state - 1;
      default:
        return state;
    }
  };
  
  export default counter;