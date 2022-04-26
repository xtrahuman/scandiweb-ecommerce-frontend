import { GETPRODUCT, PRODUCT_QUERY } from './action'

// const UploadCategory = (category) => localStorage.setItem('current_category',JSON.stringify(category))

// const currentCategory = () => JSON.parse(localStorage.getItem('current_category'));

// let initialState = PRODUCT_QUERY(currentCategory())

// if (!currentCategory()) {
//   initialState = CATEGORY_QUERY("all")
// }
const productReducer = (state = PRODUCT_QUERY("apple-imac-2021"), action) => {
    switch (action.type) {
       case GETPRODUCT :
          //  UploadCategory(action.payload)
           return PRODUCT_QUERY(action.payload);
        default :
        return state;
    }
}

export default productReducer ;