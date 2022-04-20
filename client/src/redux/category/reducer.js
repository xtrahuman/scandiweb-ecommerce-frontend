import { GETCATEGORY, CATEGORY_QUERY } from './action'

const UploadCategory = (category) => localStorage.setItem('current_category',JSON.stringify(category))

const currentCategory = () => JSON.parse(localStorage.getItem('current_category'));

let initialState = CATEGORY_QUERY(currentCategory())

if (!currentCategory()) {
  initialState = CATEGORY_QUERY("all")
}
const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
       case GETCATEGORY :
           UploadCategory(action.payload)
           return CATEGORY_QUERY(action.payload);
        default :
        return state;
    }
}

export default categoryReducer;