import React from 'react';
import {
    useLocation,
    useNavigate,
    useParams
  } from "react-router-dom";
import cartReducer, { selectImage } from '../redux/currentImage/currentImage'
import { connect } from "react-redux";


class Details extends React.Component {
    constructor(props){
        super(props)
        this.getDetails = this.getDetails.bind(this)
      }

      componentDidMount () {
        const {data, categoryName, selectImage} = this.props
        const idParam = this.props.router.params.id;
        const currentCategory = data.categories.filter(({name}) => name === categoryName)
        const { products } = currentCategory[0]
        const productDetails = products.filter(({id}) => id === idParam)
        const {gallery} = productDetails[0]
        selectImage({image: gallery[0]})
      }

      getDetails = (imageUrl) => {
        const { selectImage } = this.props
        console.log(imageUrl)
        selectImage({image: imageUrl})
      }

    render () {
        const {data, cartReducer, categoryName, symbol} = this.props
        console.log(cartReducer)
        const idParam = this.props.router.params.id;
        const currentCategory = data.categories.filter(({name}) => name === categoryName)
        const { products } = currentCategory[0]
        const productDetails = products.filter(({id}) => id === idParam)
        const {id, name, gallery, prices} = productDetails[0]
           
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
                    <div><img alt={name} src={`${cartReducer.image}`} style={{width:'500px', height:'auto'}}/></div>
                  <p>{name}</p>
                </div>
            </div>
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
  }

function mapStateToProps(state) {
    const cartReducer = state.cartReducer;
    return {
      cartReducer,
    };
  }
  
  export default connect(mapStateToProps,actionCreators)(withRouter(Details));