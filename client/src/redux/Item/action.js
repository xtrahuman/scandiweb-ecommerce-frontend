export const ADDATTRIBUTES = 'ITEM/ATTRIBUTES/ADD'
export const GETPRODUCT = 'ITEM/ATTRIBUTES/GET'

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