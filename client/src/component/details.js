import React from 'react';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import {
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

import { Query } from '@apollo/client/react/components';
import { connect } from 'react-redux';
import { selectImage } from '../redux/currentImage/currentImage';
import productDatafn, { fetchProduct } from '../redux/details/action';
import addAttrib, {
  getProduct, switchHandler, initialAttributesStyle, handleAddLogic,
} from '../redux/Item/action';
import updateCart, { addToCart } from '../redux/cart/addCart/action';

class Details extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getDetails = this.getDetails.bind(this);
    this.myRef = React.createRef(null);
    this.multiRef = React.createRef([]);
    this.multiRef.current = [];

    this.selectSwatch = this.selectSwatch.bind(this);
    this.selectNotSwatch = this.selectNotSwatch.bind(this);
    this.AddToCart = this.AddToCart.bind(this);
  }

  componentDidMount() {
    const {
      productDatafn, superData, categoryName, router,
      selectImage, getProduct, addAttrib,
    } = this.props;
    const { params } = router;
    const { id } = params;
    const idParam = id;
    fetchProduct(idParam);
    const currentCategory = superData.categories.filter(({ name }) => name === categoryName);
    const { products } = currentCategory[0];
    const productDetails = products.filter(({ id }) => id === idParam);
    const { gallery, name, prices } = productDetails[0];
    getProduct({ name, count: 0 });
    productDatafn(prices);
    selectImage({ image: gallery[0] });
    this.clearInterval = setTimeout(() => {
      initialAttributesStyle(addAttrib, this.attribClass);
    }, 1300);

    this.MuiltRefFunc = (el) => {
      if (el && !this.multiRef.current.includes(el)) {
        this.multiRef.current.push(el);
      }
    };
  }

  componentWillUnmount() {
    clearInterval(this.clearInterval);
  }

      selectSwatch = (event, name, displayValue) => {
        const { addAttrib } = this.props;
        const selected = event.currentTarget;
        const switchClass = 'active-swatch';
        switchHandler(selected, switchClass, name, displayValue, addAttrib);
      }

      selectNotSwatch = (event, name, displayValue) => {
        const { addAttrib } = this.props;
        const selected = event.currentTarget;
        const switchClass = 'Active-not-swatch';
        switchHandler(selected, switchClass, name, displayValue, addAttrib);
      }

      getDetails = (imageUrl) => {
        const { selectImage } = this.props;
        selectImage({ image: imageUrl });
      }

      AddToCart() {
        const {
          myItem, addAttrib, updateCart, addToCart, allCart,
        } = this.props;
        const showAllSuccess = document.querySelector('.detail-add-success-msg');
        const showAllError = document.querySelector('.detail-add-error-msg');
        const displayError = (showError) => {
          if (!showError) {
            showAllSuccess.classList.add('add-success-detail');
            setTimeout(() => {
              showAllSuccess.classList.remove('add-success-detail');
            }, 5000);
          } else {
            showAllError.classList.add('add-error-detail');
            setTimeout(() => {
              showAllError.classList.remove('add-error-detail');
            }, 5000);
          }
        };
        handleAddLogic(myItem, addAttrib, updateCart, addToCart, allCart,
          this.prices, this.attribClass, this.galleries, displayError);
      }

      render() {
        const {
          PRODUCT_QUERY, fetchProduct, cartReducer, router,
          selectImage, symbol,
        } = this.props;
        const { params } = router;
        const { id } = params;
        const idParam = id;
        fetchProduct(idParam);
        return (
          <Query query={PRODUCT_QUERY}>
            {({ loading, error, data }) => {
              if (error) return <h1>Error...</h1>;
              if (loading || !data) return <h1>Loading...</h1>;
              const { product } = data;
              const {
                name, inStock, gallery, prices, attributes,
              } = product;
              const element = product?.description;
              this.attribClass = attributes;
              this.galleries = gallery;
              this.prices = prices;
              this.inStock = inStock;

              if (cartReducer === null) {
                selectImage({ image: gallery[0] });
              }
              return (
                <div className="d-flex justify-content-c details-main">
                  <div className="container d-flex details-container">
                    <div className="d-flex flex-direction-column all-image">
                      {gallery.map((pictureUrl) => (
                        <div role="none" key={pictureUrl} className="all-details-image" onMouseDown={() => this.getDetails(pictureUrl)}>
                          <img alt={name} className="details-images-hover" src={`${pictureUrl}`} />
                        </div>
                      ))}
                    </div>
                    <div className="details-image-main">
                      <img alt={name} src={`${cartReducer ? cartReducer.image : gallery[0]}`} style={{ width: '100%', height: 'auto' }} />
                      <p className={`${inStock ? 'alert-off' : 'out-of-stock'} details-out-of-stock`}>out of stock</p>
                    </div>
                    <div className="details-contents pos-success-error">
                      <p className="detail-add-error-msg pos-bottom">kindly select all attributes</p>
                      <p className={`${!inStock ? 'outStock-display-msg' : ''} outStock-error-msg pos-bottom`}>This item is out of stock</p>
                      <p className="detail-add-success-msg pos-bottom">Added successfully</p>
                      <p className="details-product-name">{name}</p>
                      {attributes.map(({
                        id, name, type, items,
                      }) => (
                        <div key={id}>
                          <p className="cart-attrib-name">{`${name} :`}</p>
                          <div className="d-flex details-attributes">
                            {
                        items.map(({ id, displayValue }) => (
                          <div key={id}>
                            {
                                type === 'swatch'
                                  ? (
                                    <div>
                                      <div role="none" ref={this.MuiltRefFunc} data-id={displayValue} onMouseDown={(e) => this.selectSwatch(e, name, displayValue)} className={`swatch-container ${name.split(' ').join('')}`}>
                                        <div className="swatch" style={{ backgroundColor: displayValue }} />
                                      </div>
                                    </div>
                                  )
                                  : (
                                    <div>
                                      <div role="none" ref={this.MuiltRefFunc} data-id={displayValue} onMouseDown={(e) => this.selectNotSwatch(e, name, displayValue)} className={`d-flex not-swatch ${name.split(' ').join('')}`}>
                                        <p>{displayValue}</p>
                                      </div>
                                    </div>
                                  )
}
                          </div>
                        ))
}
                          </div>
                        </div>
                      ))}
                      <div>
                        <p className="cart-attrib-price">prices :</p>
                        {prices.filter(({ currency }) => currency.symbol === symbol)
                          .map(({ currency, amount }) => <p className="details-amount" id="product" data-id={amount} key={currency.symbol}>{`${currency.symbol} ${amount}`}</p>)}
                      </div>
                      <div className="button-contain">
                        <button onClick={this.AddToCart} disabled={!inStock} className="details-button" type="button">ADD TO CART</button>
                      </div>
                      <div className="descriptionBody">
                        {
                       Parser(element)
                      }
                      </div>
                    </div>
                  </div>
                </div>
              );
            }}
          </Query>
        );
      }
}

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
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
  productDatafn,
  addToCart,
  updateCart,
};

function mapStateToProps(state) {
  const { cartReducer } = state;
  const PRODUCT_QUERY = state.productReducer;
  const myItem = state.itemReducer;
  const { allCart } = state;
  return {
    cartReducer,
    PRODUCT_QUERY,
    myItem,
    allCart,
  };
}

Details.propTypes = {
  PRODUCT_QUERY: PropTypes.instanceOf(Object).isRequired,
  cartReducer: PropTypes.instanceOf(Object).isRequired,
  router: PropTypes.instanceOf(Object).isRequired,
  myItem: PropTypes.instanceOf(Object).isRequired,
  superData: PropTypes.instanceOf(Object).isRequired,
  allCart: PropTypes.instanceOf(Array).isRequired,
  selectImage: PropTypes.func.isRequired,
  fetchProduct: PropTypes.func.isRequired,
  getProduct: PropTypes.func.isRequired,
  addAttrib: PropTypes.func.isRequired,
  productDatafn: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
  symbol: PropTypes.string.isRequired,
  categoryName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, actionCreators)(withRouter(Details));
