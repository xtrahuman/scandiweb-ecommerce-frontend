const SELECTIMAGE = 'GALLERY/CURRENTIMAGE/SELECTIMAGE'

export const selectImage = (payload) => (
    {
        type: SELECTIMAGE,
        payload,
    }
)


const UploadCart = (cart) => localStorage.setItem('current_cart',JSON.stringify(cart))

const currentCart = () => JSON.parse(localStorage.getItem('current_cart'));

let initialState = currentCart()

if (!currentCart) {
  initialState = {}
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
       case SELECTIMAGE :
           UploadCart(action.payload)
           return action.payload;
        default :
        return state;
    }
}

export default cartReducer;