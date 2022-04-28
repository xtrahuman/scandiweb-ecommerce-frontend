import React from "react";
import { Link } from 'react-router-dom';
import allCounter  from '../redux/cart/editCart/actions'
import { getCartToEdit , switchAttrib} from "../redux/cart/editCart/actions";
import updateCart from "../redux/cart/addCart/action";
import { v4 as uuidv4 } from 'uuid';
import { connect } from "react-redux";
import toggleMiniCart from "../redux/display/action";

class MiniCart extends React.Component {
    constructor(props) {
        super(props)
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount () {
        const { allCart, getCartToEdit } = this.props
        const {cartId} = allCart
            const data = allCart.slice()
            getCartToEdit(data)
            setTimeout(()=>{
                this.initialAttributesStyle(data)
            },1300)  
            document.addEventListener("click", this.handleClickOutside);
    }

    increment = (index, updateCart) => {
        const { allCounter, allCart } = this.props
        allCounter(allCart, 'add', index,updateCart)
    }

    decrement = (index, updateCart) => {
        const { allCounter, allCart } = this.props
        allCounter(allCart, 'substract', index,updateCart)
    }

      componentWillUnmount() {
        document.removeEventListener("click", this.handleClickOutside);
      }
    
      handleClickOutside(event) {
          const {iconElem, toggleMiniCart, miniCartActive} = this.props
        if ( iconElem && !iconElem.contains(event.target) && miniCartActive && this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
                toggleMiniCart()
        }
      }

  
        // const { id } = currentCar;
        // const allCars = cars.cars;
        // let index = 0;
      
        // moreHandler = () => {
        //   const l = allCars.length;
        //   let nextIndex = 0;
        //   if (index < l - 1) {
        //     nextIndex = index + 1;
        //   } else {
        //     nextIndex = 0;
        //   }
        //   const nextCar = allCars[nextIndex];
        // //   dispatch(selectCar(nextCar));
        // };

        selectSwatch = (event, name, displayValue,index, cartId) =>{
              const selected = event.currentTarget;
              const switchClass = 'active-swatch'
              this.switchHandler(selected,switchClass, name, displayValue, index, cartId)
        }
    
          selectNotSwatch = (event, name, displayValue,index, cartId) => {
          const selected = event.currentTarget;
          const switchClass = 'Active-not-swatch'
          this.switchHandler(selected,switchClass, name, displayValue,index,cartId)
        }
    
          switchHandler = (selected, switchClass, attrib, value,index,cartId) => {
            const {allCart, switchAttrib, updateCart} = this.props
            const data = allCart.slice()
            const attribName = attrib.split(' ').join('')
            const cartIdCheck = `h${cartId.slice(0, 8).split('-').join('')}h`
            const parentElement= document.querySelectorAll(`.attribName`)
            parentElement.forEach((element) =>{
                    element.classList.forEach((classes) => {
                            if(classes === switchClass && element.classList.includes(cartIdCheck) ){
                                element.classList.remove(switchClass)
                            }
                        }) 
            })
            switchAttrib(data,index, attribName,value, updateCart)
            selected.classList.add(switchClass)
          }

          componentDidUpdate () {
              const{ allCart } = this.props;
              this.initialAttributesStyle(allCart)
          }

        initialAttributesStyle = (data) => {
            data.forEach(({cartId, attributes,...args}) =>{
                let values = Object.entries(args)
            attributes?.forEach(({name}) => {
              const attribName = name.split(' ').join('')
              const getAtribEl = document.querySelectorAll(`.${attribName}`)
              const cartIdCheck = `h${cartId.slice(0, 8).split('-').join('')}h`
              getAtribEl.forEach((checkAttrib) =>{
              let value = checkAttrib.dataset.id
                values.forEach((myVal) =>{
              if(attribName === myVal[0] && value === myVal[1]){
                checkAttrib.classList.forEach((classl) => {
                    if(checkAttrib.classList.value.includes(cartIdCheck)){
                        if(classl === "not-swatch"){
                            checkAttrib.classList.add('Active-not-swatch')
                        } else{
                            checkAttrib.classList.add('active-swatch')
                        }
                    }
                }
            )
              }
            })
              })
            })
        })
          }

    render (){
        const {counter, updateCart, toggleMiniCart, allCart, cartDisplay, editCart,miniCartActive } = this.props
        let sum = 0
        let Qty = 0
        let tax = 5
        console.log(miniCartActive)
        this.publicData = editCart
        const data = editCart
        data?.map(({total, count}) => {
            Qty += count
            sum+= total
        })

        tax = tax * Qty
        
        return(
            <div ref={this.wrapperRef} className={`d-flex miniCart-width ${cartDisplay} justify-content-c`}>
              <div className="d-flex minicart-relative mini-container flex-direction-column">
              <div> <span className="minicart-title">My Bag,</span> <span className="minicart-qty">{data ? `${Qty} items` : ''}</span></div>
                {data?.map(({cartId, name, count, total, attributes,galleries},index) =>
                <div key={uuidv4()} className="d-flex justify-content-between minicart-border">
                    <div className="d-flex flex-direction-column attributes-minicart-container attributes-container">
                        <h3 className="product-minicart-name">{name}</h3>
                        <p className="product-minicart-price">{total.toFixed(2)}</p>
                        {attributes.map(({id, name,type,items}) => 
                    <div key={id}>
                        <p className="cart-attrib-minicart-name">{`${name} :`}</p>
                        <div className="d-flex details-attributes details-minicart-attributes">
                        {
                        items.map(({id, displayValue}) => 
                            <div key={id}>
                                {
                                type === 'swatch' ?
                                <div>
                                <div ref={this.MuiltRefFunc} data-name={name} data-id={displayValue} onClick={(e)=>this.selectSwatch(e, name, displayValue,index,cartId)} className={`swatch-container ${name.split(' ').join('')} h${cartId.slice(0, 8).split('-').join('')}h`}>
                                <div  className ='swatch swatch-minicart'  style={{backgroundColor: displayValue }}></div> 
                                </div>
                                </div> 
                                :
                                <div>
                                <div ref={this.MuiltRefFunc} data-id={displayValue}  data-name={name} onClick={(e)=>this.selectNotSwatch(e, name, displayValue,index,cartId)}  className ={`d-flex not-swatch not-swatch-minicart ${name.split(' ').join('')} h${cartId.slice(0, 8).split('-').join('')}h`}> 
                                <p>{displayValue}</p> 
                                </div>
                                </div>
                                }
                            </div>
                        )}
                        </div>
                    </div>
                  )}
                    </div>
                    <div className="d-flex cart-counter-image .cart-counter-minicart-image">
                        <div className="d-flex flex-direction-column cart-counter cart-counter-minicart">
                            <div onClick={() => this.increment(index,updateCart)} className="d-flex counter-change counter-change-minicart"><span >+</span></div>
                            <p>{count}</p>
                            <div onClick={() => this.decrement(index, updateCart)} className="d-flex counter-change counter-change-minicart"><span >-</span></div>
                        </div>
                        <div className="cart-img-container"><img src = {galleries.currentGallery} style={{width: '100%', height: '100%', objectFit: 'contain'}}/></div>
                    </div>
                    
                </div>
                 )}
            </div>
                 <div className='d-flex flex-direction-column mini-order-style'>
                 <div className='d-flex mini-cart-checkout mini-cart-order-top'> <span className="mini-cart-order-title">Tax :</span> <span className="mini-cart-order-value">{tax}</span></div>
                 <div className="d-flex mini-cart-checkout cart-total"> <span className="mini-cart-order-title">Total :</span> <span className="mini-cart-order-value">{data ? sum.toFixed(2)-tax : ''}</span></div>
                 <div className="d-flex button-space-btw">
                 <Link onClick={toggleMiniCart} className="d-flex" to="/cart"><button className='details-minicart-button view-bag-btn order-btn' type='button'>view bag</button></Link>
                 <button  disabled={true} className='details-button details-minicart-button order-btn' type='button'>check out</button>
                 </div>
                 </div>
        </div>
        )
    }
}

const actionCreators = {
    allCounter,
    updateCart,
    getCartToEdit,
    switchAttrib,
    toggleMiniCart,
  }

function mapStateToProps(state) {
    const editCart = state.editCart;
    const CATEGORY_QUERY = state.categoryReducer
    const myItem = state.itemReducer
    const allCart = state.allCart
    const miniCartActive = state.miniCartActive
    return {
      editCart,
      CATEGORY_QUERY,
      allCart,
      myItem,
      miniCartActive,
    };
  }

  export default connect(mapStateToProps,actionCreators)(MiniCart);
