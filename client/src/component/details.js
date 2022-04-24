import React from 'react';
import { Link } from 'react-router-dom';
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
            mounted: false
        }
        this.myRef = React.createRef(null);
        this.multiRef = React.createRef([]);
        this.multiRef.current = []

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
         this.clearInterval = setTimeout(()=>{
          this.initialAttributesStyle()
           },1500)  
          
           this.MuiltRefFunc = (el) => {
            if(el && !this.multiRef.current.includes(el)){
                this.multiRef.current.push(el)
            }
        }
      }

      componentWillUnmount() {
        clearInterval(this.clearInterval);
      }

      selectSwatch = (event, name) =>{
        this.setState(({selectedNotSwatch}) => ({ 
            selectedNotSwatch: !selectedNotSwatch
          }))
          const selected = event.currentTarget;
          const switchClass = 'active-swatch'
          this.switchHandler(selected,switchClass, name)
    }

      selectNotSwatch = (event, name ) => {
        this.setState(({selectedNotSwatch}) => ({ 
            selectedNotSwatch: !selectedNotSwatch
          }))
      const selected = event.currentTarget;
      const switchClass = 'Active-not-swatch'
      this.switchHandler(selected,switchClass, name)
    }

      switchHandler = (selected, switchClass, testremoval) => {
        const parentElement= document.querySelectorAll(`.${testremoval.split(' ').join('')}`)
        parentElement.forEach((element) =>{
                element.classList.forEach((classes) => {
                        if(classes === switchClass ){
                            element.classList.remove(switchClass)
                        }
                    }) 
        })
              selected.classList.add(switchClass)
      }

      getDetails = (imageUrl) => {
        const { selectImage } = this.props
        selectImage({image: imageUrl})
      }

      initialAttributesStyle = () => {
        const firstNotSwatch = document.querySelectorAll(".not-swatch")[0]
        const firstSwatch= document.querySelectorAll(".swatch-container")[0]
        firstNotSwatch?.classList.add('Active-not-swatch')
        firstSwatch?.classList.add('active-swatch')
        console.log(this.atrrClass)
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
                                <div ref={this.MuiltRefFunc} data-id={displayValue} onClick={(e)=>this.selectSwatch(e, name)} className={`swatch-container ${name.split(' ').join('')}`}>
                                <div  className ='swatch'  style={{backgroundColor: displayValue }}></div> 
                                </div>
                                </div> 
                                :
                                <div>
                                <div ref={this.MuiltRefFunc} id={name} onClick={(e)=>this.selectNotSwatch(e, name)}  className ={`d-flex not-swatch ${name.split(' ').join('')}`}> 
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