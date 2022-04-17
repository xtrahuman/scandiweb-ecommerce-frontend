import React from 'react';
import {
    useLocation,
    useNavigate,
    useParams
  } from "react-router-dom";

class Details extends React.Component {

    render () {
        const {data, categoryName, symbol} = this.props
        const idParam = this.props.router.params.id;
        const currentCategory = data.categories.filter(({name}) => name === categoryName)
        const { products } = currentCategory[0]
        const productDetails = products.filter(({id}) => id === idParam)
        const {id, name, gallery, prices} = productDetails[0]
        return(
            <div className='d-flex justify-content-c'>
                <div className= 'container d-flex '>
                    <div className='d-flex flex-direction-row all-image'>
                        {gallery.map((pictureUrl) => 
                        <img key={pictureUrl} src={`${pictureUrl}`} style={{width:'90px', height:'auto'}}/>)} 
                    </div>
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

export default withRouter(Details)