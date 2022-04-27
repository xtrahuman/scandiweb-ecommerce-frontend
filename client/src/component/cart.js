import React from "react";
import allCounter  from '../redux/cart/editCart/actions'
import { getCartToEdit , switchAttrib} from "../redux/cart/editCart/actions";
import updateCart from "../redux/cart/addCart/action";
import { v4 as uuidv4 } from 'uuid';
import { connect } from "react-redux";

class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
    }

    componentDidMount () {
        const { allCart, getCartToEdit } = this.props
        const {cartId} = allCart
            const data = allCart.slice()
            getCartToEdit(data)
            setTimeout(()=>{
                this.initialAttributesStyle(data)
            },1300)  
    }

    increment = (index, updateCart) => {
        const { allCounter, allCart } = this.props
        allCounter(allCart, 'add', index,updateCart)
    }

    decrement = (index, updateCart) => {
        const { allCounter, allCart } = this.props
        allCounter(allCart, 'substract', index,updateCart)
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
        const {counter, updateCart, allCart, editCart } = this.props
        let sum = 0
        let Qty = 0
        let tax = 5
        this.publicData = editCart
        const data = editCart
        data?.map(({total, count}) => {
            Qty += count
            sum+= total
        })

        tax = tax * Qty
        
        return(
            <div className="d-flex justify-content-c">
              <div className="d-flex container flex-direction-column">
                <h2 className="page-title">CART</h2>
                {data?.map(({cartId, name, count, total, attributes,galleries},index) =>
                <div key={uuidv4()} className="d-flex justify-content-between cart-border">
                    <div className="d-flex flex-direction-column attributes-container">
                        <h3 className="product-name">{name}</h3>
                        <p className="product-price">{total.toFixed(2)}</p>
                        {attributes.map(({id, name,type,items}) => 
                    <div key={id}>
                        <p className="cart-attrib-name">{`${name} :`}</p>
                        <div className="d-flex details-attributes">
                        {
                        items.map(({id, displayValue}) => 
                            <div key={id}>
                                {
                                type === 'swatch' ?
                                <div>
                                <div ref={this.MuiltRefFunc} data-name={name} data-id={displayValue} onClick={(e)=>this.selectSwatch(e, name, displayValue,index,cartId)} className={`swatch-container ${name.split(' ').join('')} h${cartId.slice(0, 8).split('-').join('')}h`}>
                                <div  className ='swatch'  style={{backgroundColor: displayValue }}></div> 
                                </div>
                                </div> 
                                :
                                <div>
                                <div ref={this.MuiltRefFunc} data-id={displayValue}  data-name={name} onClick={(e)=>this.selectNotSwatch(e, name, displayValue,index,cartId)}  className ={`d-flex not-swatch ${name.split(' ').join('')} h${cartId.slice(0, 8).split('-').join('')}h`}> 
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
                    <div className="d-flex cart-counter-image">
                        <div className="d-flex flex-direction-column cart-counter">
                            <div onClick={() => this.increment(index,updateCart)} className="d-flex counter-change"><span >+</span></div>
                            <p>{count}</p>
                            <div onClick={() => this.decrement(index, updateCart)} className="d-flex counter-change"><span >-</span></div>
                        </div>
                        <div className="cart-img-container"><img src = {galleries.currentGallery} style={{width: '100%', height: '100%', objectFit: 'contain'}}/></div>
                    </div>
                    
                </div>
                 )}
                 <div className='order-style'>
                 <div> <span>Tax :</span> <span>{tax}</span></div>
                 <div> <span>Qty :</span> <span>{data ? Qty : ''}</span></div>
                 <div> <span>Total :</span> <span>{data ? sum.toFixed(2) : ''}</span></div>
                 <button onClick={''} disabled={true} className='details-button' type='button'>order</button>
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
  }

function mapStateToProps(state) {
    const editCart = state.editCart;
    const CATEGORY_QUERY = state.categoryReducer
    const myItem = state.itemReducer
    const allCart = state.allCart
    return {
      editCart,
      CATEGORY_QUERY,
      allCart,
      myItem,
    };
  }

  export default connect(mapStateToProps,actionCreators)(Cart);
