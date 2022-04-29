import { TOGGLE_CART, TOGGLE_DROP_DOWN } from "./action";

const miniCartActive = (state = false, action) => {
    switch (action.type){
        case TOGGLE_CART :
            return !state;
        default :
            return state;
    }
}

export const dropDownActive = (state = false, action) => {
    switch (action.type){
        case TOGGLE_DROP_DOWN :
            return !state;
        default :
            return state;
    }
}

export default miniCartActive;