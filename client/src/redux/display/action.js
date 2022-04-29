export const TOGGLE_CART = 'NAVBAR/TOGGLE/CART'
export const TOGGLE_DROP_DOWN = 'NAVBAR/TOGGLE/DROPDOWN'

 const toggleMiniCart = () => ({
    type: TOGGLE_CART
})

 export const toggleDropdown = () => ({
    type: TOGGLE_DROP_DOWN
})

export default toggleMiniCart;