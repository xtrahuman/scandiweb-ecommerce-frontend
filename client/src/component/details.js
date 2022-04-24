import React from 'react';
import { Link } from 'react-router-dom';
import {
    useLocation,
    useNavigate,
    useParams
  } from "react-router-dom";
import cartReducer, { selectImage } from '../redux/currentImage/currentImage'
import { fetchProduct } from '../redux/details/action';
import addAttrib, {getProduct} from '../redux/cartItems/action';
import {Query} from '@apollo/client/react/components'
import { connect } from "react-redux";



class Details extends React.Component {
    constructor(props){
        super(props)
        this.getDetails = this.getDetails.bind(this)
        this.id = this.props.router.params.id
        this.state = {
            selectedSwatch: false,
            selectedNotSwatch: false,
            mounted: false
        }
        this.myRef = React.createRef(null);
        this.multiRef = React.createRef([]);
        this.multiRef.current = []

        this.selectSwatch = this.selectSwatch.bind(this)
        this.selectNotSwatch = this.selectNotSwatch.bind(this)
      }

      componentDidMount () {
        const {superData, categoryName, selectImage, getProduct, addAttrib, myItem} = this.props
        const idParam = this.props.router.params.id;
        fetchProduct(idParam);
        const currentCategory = superData.categories.filter(({name}) => name === categoryName)
        const { products } = currentCategory[0]
        console.log(products) 
        const productDetails = products.filter(({id}) => id === idParam)
        const {gallery, name} = productDetails[0]
        const obj = {name: name, count: 0}
        getProduct(obj)
        console.log(myItem)
        selectImage({image: gallery[0]})
         this.clearInterval = setTimeout(()=>{
          this.initialAttributesStyle(addAttrib)
           },1300)  
          
           this.MuiltRefFunc = (el) => {
            if(el && !this.multiRef.current.includes(el)){
                this.multiRef.current.push(el)
            }
        }
      }

      componentWillUnmount() {
        clearInterval(this.clearInterval);
      }

      selectSwatch = (event, name, displayValue) =>{
        this.setState(({selectedNotSwatch}) => ({ 
            selectedNotSwatch: !selectedNotSwatch
          }))
          const selected = event.currentTarget;
          const switchClass = 'active-swatch'
          this.switchHandler(selected,switchClass, name, displayValue)
    }

      selectNotSwatch = (event, name, displayValue ) => {
        this.setState(({selectedNotSwatch}) => ({ 
            selectedNotSwatch: !selectedNotSwatch
          }))
      const selected = event.currentTarget;
      const switchClass = 'Active-not-swatch'
      this.switchHandler(selected,switchClass, name, displayValue)
    }

      switchHandler = (selected, switchClass, attrib, value) => {
        const { addAttrib } = this.props
        const attribName = attrib.split(' ').join('')
        const parentElement= document.querySelectorAll(`.${attribName}`)
        parentElement.forEach((element) =>{
                element.classList.forEach((classes) => {
                        if(classes === switchClass ){
                            element.classList.remove(switchClass)
                        }
                    }) 
        })
        let obj = {}
        obj[attribName] = value;
        addAttrib(obj)
        // this.setState((prev) =>({...prev, ...obj}))
              selected.classList.add(switchClass)
      }

      getDetails = (imageUrl) => {
        const { selectImage } = this.props
        selectImage({image: imageUrl})
      }

      initialAttributesStyle = (addAttrib) => {
        // const firstNotSwatch = document.querySelectorAll(".not-swatch")[0]
        // const firstSwatch= document.querySelectorAll(".swatch-container")[0]
        // firstNotSwatch?.classList.add('Active-not-swatch')
        // firstSwatch?.classList.add('active-swatch')
        this.attribClass?.forEach(({name}) => {
          const attribName = name.split(' ').join('')
          const getAtribEl = document.querySelectorAll(`.${attribName}`)[0]
          let value = getAtribEl.dataset.id
          getAtribEl.classList.forEach((classl) =>
           classl === "not-swatch" ? getAtribEl.classList.add('Active-not-swatch') : getAtribEl.classList.add('active-swatch')
          )

        let obj = {}
        obj[attribName] = value;
        addAttrib(obj);
          
        })
      }

      componentDidUpdate () {
        const { myItem } = this.props
        console.log( myItem )
      }

    render () {
        const { PRODUCT_QUERY,myItem , fetchProduct, cartReducer, selectImage, symbol} = this.props
        const idParam = this.props.router.params.id;
        console.log(myItem)
        fetchProduct(idParam)
        return (
            <Query query={PRODUCT_QUERY}>
         {({ loading, error, data }) => {
             if (error) return <h1>Error...</h1>;
             if (loading || !data) return <h1>Loading...</h1>
         console.log(data)
         const {product} = data
         const {id, name, gallery, prices, attributes } = product
         const element = product?.description;
         this.attribClass = attributes
        if(cartReducer === null) {
            selectImage({image: gallery[0]})
        }
        return(
            <div className='d-flex justify-content-c details-main'>
                <div className= 'container d-flex details-container'>
                    <div className='d-flex flex-direction-column all-image'>
                        {gallery.map((pictureUrl) => 
                        <div key={pictureUrl} onClick={() => this.getDetails(pictureUrl)} >
                        <img alt={name}  src={`${pictureUrl}`} style={{width:'90px', height:'auto'}}/>
                        </div>
                        )}
                    </div>
                    <div className="details-image-main"><img alt={name} src={`${cartReducer? cartReducer.image : gallery[0] }`} style={{width:'100%', height:'auto'}}/></div>
                  <div className='details-contents' style={{}}>
                  <p>{name}</p>
                  {attributes.map(({id, name,type,items}) => 
                    <div key={id}>
                        <p>{`${name} :`}</p>
                        <div className="d-flex details-attributes">
                        {
                        items.map(({id, displayValue}) => 
                            <div key={id}>
                                {
                                type === 'swatch' ?
                                <div>
                                <div ref={this.MuiltRefFunc} data-id={displayValue} onClick={(e)=>this.selectSwatch(e, name, displayValue)} className={`swatch-container ${name.split(' ').join('')}`}>
                                <div  className ='swatch'  style={{backgroundColor: displayValue }}></div> 
                                </div>
                                </div> 
                                :
                                <div>
                                <div ref={this.MuiltRefFunc}  data-id={displayValue} onClick={(e)=>this.selectNotSwatch(e, name, displayValue)}  className ={`d-flex not-swatch ${name.split(' ').join('')}`}> 
                                <p>{displayValue}</p> 
                                </div>
                                </div>
                                }
                            </div>
                        )}
                        </div>
                    </div>
                  )}
                  <div>
                   <p>prices :</p>   
                  {prices.filter(({currency}) => currency.symbol === symbol)
                         .map(({currency,amount}) => 
                     <p className='details-amount' key={currency.symbol}>{`${currency.symbol} ${amount}`}</p>
                     )}
                  </div>
                  <div className='button-contain'>
                      <Link to="/cart"><button className='details-button' type='button'>ADD TO CART</button></Link>
                  </div>
                   <div className = "descriptionBody" dangerouslySetInnerHTML={ {__html: element } }></div>
                </div>
                </div>
            </div>
        )
    }}
    </Query>
      )
    }
}
  
  function withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
        <Component
          {...props}
          router={{ location, navigate, params }}
        />
      );
    }
  
    return ComponentWithRouterProp;
  }

  const actionCreators = {
   selectImage,
   fetchProduct,
   getProduct,
   addAttrib,
  }

function mapStateToProps(state) {
    const cartReducer = state.cartReducer;
    const PRODUCT_QUERY = state.productReducer;
    const myItem = state.itemReducer;
    return {
      cartReducer,
      PRODUCT_QUERY,
      myItem,
    };
  }
  
  export default connect(mapStateToProps,actionCreators)(withRouter(Details));