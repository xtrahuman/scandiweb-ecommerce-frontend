import React from 'react';
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

      getDetails = (imageUrl) => {
        const { selectImage } = this.props
        selectImage({image: imageUrl})
      }

    render () {
        const { PRODUCT_QUERY, fetchProduct, cartReducer, selectImage, symbol} = this.props
        console.log(cartReducer)
        const idParam = this.props.router.params.id;
        fetchProduct(idParam)

        return (
            <Query query={PRODUCT_QUERY}>
         {({ loading, error, data }) => {
             if (error) return <h1>Error...</h1>;
             if (loading || !data) return <h1>Loading...</h1>
         console.log(data)
         const {product} = data
         const {id, name, gallery, prices, attributes} = product
        if(cartReducer === null) {
            selectImage({image: gallery[0]})
        }
        return(
            <div className='d-flex justify-content-c'>
                <div className= 'container d-flex details-container'>
                    <div className='d-flex flex-direction-column all-image'>
                        {gallery.map((pictureUrl) => 
                        <div key={pictureUrl} onClick={() => this.getDetails(pictureUrl)} >
                        <img alt={name}  src={`${pictureUrl}`} style={{width:'90px', height:'auto'}}/>
                        </div>
                        )}
                    </div>
                    <div><img alt={name} src={`${cartReducer? cartReducer.image : gallery[0] }`} style={{width:'50%', height:'auto'}}/></div>
                  <div style={{width:'50%', height:'auto'}}>
                  <p>{name}</p>
                  {attributes.map(({id, name,type,items}) => 
                    <div key={id}>
                        <p>{`${name} :`}</p>
                        {
                        items.map(({id, displayValue}) =>
                            <div key={id}>
                                <p style={{backgroundColor: type === 'swatch'? displayValue : 'black', color:' white',width:'50px', height:'40px'}}>{type === 'swatch' ? '' : displayValue}</p>
                            </div>
                        )}
                    </div>
                  )}
                  
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