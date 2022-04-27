export const ALL_COUNTER = 'CART/ITEMS/COUNTER'
export const GET_CART = 'CART/ITEMS/GET'
export const SWITCH_ATTRIBUTE = 'CART/ITEMS/ATTRIBUTES/SWITCH'

 export const getCartToEdit = (payload) => 
      ({
         type: GET_CART,
         payload
     })

const allCounter = (cartData, sign, index,updateCart) => {
    const data = cartData.slice()
    console.log(data[index].count)
        if(sign === 'add'){
            data[index].count = data[index].count+1;
          }else if (data[index].count > 0 && sign ==='substract'){
            data[index].count = data[index].count-1;
          }
          
    data[index].total = data[index].count * data[index].price

     updateCart(data)

     return {
        type: ALL_COUNTER,
        payload: data,
    };
  }

export const switchAttrib = (data, index, attribName,value, updateCart) => {
  const assign = (obj, keyPath, value) => {
    let lastKeyIndex = keyPath.length-1;
     for (var i = 0; i < lastKeyIndex; ++ i) {
       let key = keyPath[i];
       if (!(key in obj)){
         obj[key] = {}
       }
       obj = obj[key];
     }
     obj[keyPath[lastKeyIndex]] = value;
     
  }
  assign(data[index], [attribName], value)
 updateCart(data)

     return {
        type: SWITCH_ATTRIBUTE,
        payload: data,
    };
     
}

export default allCounter
