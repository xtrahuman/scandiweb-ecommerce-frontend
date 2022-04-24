export const ADDATTRIBUTES = 'CART/ITEM/ADD'
export const GETPRODUCT = 'CART/ITEM/GET'

 const addAttrib = (payload) => 
      ({
         type: ADDATTRIBUTES,
         payload
     })
 

 export const getProduct = (payload) => (
    {
         type: GETPRODUCT,
         payload
     }
 )

 export default addAttrib;