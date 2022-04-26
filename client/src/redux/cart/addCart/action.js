export const ADD_TO_CART = 'CART/ITEMS/ADD'
export const  UPDATE_CART = 'CART/ITEMS/UPDATE'

 export const addToCart = (payload) => 
      ({
         type: ADD_TO_CART,
         payload
     })
 

 const updateCart = (payload) => (
    {
         type: UPDATE_CART,
         payload
     }
 )

 export default updateCart;