import {GETPRODUCT } from "./action";


const productData = (state = {}, action) =>{
    switch(action.type) {
        case GETPRODUCT:
            return action.payload;
        default:
            return state;
    }
}

export default productData