export const ALL_COUNTER = 'CART/ITEMS/COUNTER'
export const GET_CART = 'CART/ITEMS/GET'

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

export default allCounter
