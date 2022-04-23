import React from 'react';
import ReactDOM from 'react-dom';
import {
    useLocation,
    useNavigate,
    useParams
  } from "react-router-dom";
import cartReducer, { selectImage } from '../redux/currentImage/currentImage'
import { fetchProduct } from '../redux/details/action';
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
        }
        this.myRef = React.createRef();
        this.selectSwatch = this.selectSwatch.bind(this)
        this.selectNotSwatch = this.selectNotSwatch.bind(this)
      }

      componentDidMount () {
        const {superData, categoryName, selectImage} = this.props
        const idParam = this.props.router.params.id;
        fetchProduct(idParam);
        const currentCategory = superData.categories.filter(({name}) => name === categoryName)
        const { products } = currentCategory[0]
        console.log(products) 
        const productDetails = products.filter(({id}) => id === idParam)
        const {gallery} = productDetails[0]
        selectImage({image: gallery[0]})
      }

      selectSwatch = (event) =>{
        this.setState(({selectedSwatch}) => ({ 
        selectedSwatch: !selectedSwatch
      }))
       const selected = event.currentTarget
    const allSwatch = document.querySelectorAll('.swatch-container')
    allSwatch.forEach((i) =>  
    i.classList.forEach((x)=> {
        if(x==='active-swatch'){
           i.classList.remove('active-swatch')
        }
    }
    ))
          selected.classList.add('active-swatch')
          console.log(this.myRef.current)
    }

      selectNotSwatch = (event) => {this.setState(({selectedNotSwatch}) => ({ 
        selectedNotSwatch: !selectedNotSwatch
      }))
      const selected = event.currentTarget;
      const classProp = '.not-swatch'
      const switchClass = 'Active-not-swatch'
      this.switchHandler(selected,classProp,switchClass)
    }

      switchHandler = (selected, classProp, switchClass) => {
        this.setState(({selectedSwatch}) => ({ 
            selectedSwatch: !selectedSwatch
          }))
        const allAttribute = document.querySelectorAll(classProp)
        allAttribute.forEach((attrib) =>  
        attrib.classList.forEach((atrributeClass)=> {
            if(atrributeClass===switchClass){
                attrib.classList.remove(switchClass)
            }
        }
        ))
              selected.classList.add(switchClass)
              console.log(selected.textContent)
      }

      getDetails = (imageUrl) => {
        const { selectImage } = this.props
        selectImage({image: imageUrl})
      }

    render () {
        const { PRODUCT_QUERY, fetchProduct, cartReducer, selectImage, symbol} = this.props
        const idParam = this.props.router.params.id;
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
        //  const descriptionBody = document.getElementById('descriptionBody')
        //  descriptionBody?.appendChild(element);
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
                        <div  ref = {this.myRef} className="d-flex details-attributes">
                        {
                        items.map(({id, displayValue}) =>
                            <div  key={id}>
                                {
                                type === 'swatch' ? 
                                <div data-id={displayValue} onClick={(e)=>this.selectSwatch(e)} className='swatch-container'>
                                <div  className ='swatch'  style={{backgroundColor: displayValue }}></div> 
                                </div>
                                :
                                <div onClick={(e)=>this.selectNotSwatch(e)}  className =' d-flex not-swatch'> 
                                <p>{displayValue}</p> 
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
                      <button className='details-button' type='button'>ADD TO CART</button>
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
  }

function mapStateToProps(state) {
    const cartReducer = state.cartReducer;
    const PRODUCT_QUERY = state.productReducer;
    return {
      cartReducer,
      PRODUCT_QUERY,
    };
  }
  
  export default connect(mapStateToProps,actionCreators)(withRouter(Details));