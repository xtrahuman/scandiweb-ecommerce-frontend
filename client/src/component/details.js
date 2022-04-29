import React from 'react';
import PropTypes from 'prop-types';
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';
import { Query } from '@apollo/client/react/components';
import { connect } from 'react-redux';
import { selectImage } from '../redux/currentImage/currentImage';
import { fetchProduct } from '../redux/details/query/action';
import addAttrib, { getProduct } from '../redux/Item/action';
import updateCart, { addToCart } from '../redux/cart/addCart/action';
import productDatafn from '../redux/details/data/action';

class Details extends React.Component {
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
      selectImage, getProduct, addAttrib, symbol,
    } = this.props;
    const { params } = router;
    const { id } = params;
    const idParam = id;
    fetchProduct(idParam);
    const currentCategory = superData.categories.filter(({ name }) => name === categoryName);
    const { products } = currentCategory[0];
    const productDetails = products.filter(({ id }) => id === idParam);
    const { gallery, name, prices } = productDetails[0];
    prices.filter(({ currency }) => currency.symbol === symbol)
      .map(({ amount }) => getProduct({ name, count: 0, price: amount }));
    productDatafn(prices);
    selectImage({ image: gallery[0] });
    this.clearInterval = setTimeout(() => {
      this.initialAttributesStyle(addAttrib);
    }, 800);

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
        const selected = event.currentTarget;
        const switchClass = 'active-swatch';
        this.switchHandler(selected, switchClass, name, displayValue);
      }

      selectNotSwatch = (event, name, displayValue) => {
        const selected = event.currentTarget;
        const switchClass = 'Active-not-swatch';
        this.switchHandler(selected, switchClass, name, displayValue);
      }

      switchHandler = (selected, switchClass, attrib, value) => {
        const { addAttrib } = this.props;
        const attribName = attrib.split(' ').join('');
        const parentElement = document.querySelectorAll(`.${attribName}`);
        parentElement.forEach((element) => {
          element.classList.forEach((classes) => {
            if (classes === switchClass) {
              element.classList.remove(switchClass);
            }
          });
        });
        const obj = {};
        obj[attribName] = value;
        addAttrib(obj);
        selected.classList.add(switchClass);
      }

      getDetails = (imageUrl) => {
        const { selectImage } = this.props;
        selectImage({ image: imageUrl });
      }

      initialAttributesStyle = (addAttrib) => {
        this.attribClass?.forEach(({ name }) => {
          const attribName = name.split(' ').join('');
          const getAtribEl = document.querySelectorAll(`.${attribName}`)[0];
          const value = getAtribEl.dataset.id;
          getAtribEl.classList.forEach((classl) => (classl === 'not-swatch' ? getAtribEl.classList.add('Active-not-swatch') : getAtribEl.classList.add('active-swatch')));
          const obj = {};
          obj[attribName] = value;
          addAttrib(obj);
        });
      }

      compareObjects = (a, b) => {
        const recurseCheck = (objt) => Object.entries(objt).sort().map((i) => {
          if (i[1] instanceof Object) {
            i[1] = recurseCheck(i[1]);
          }
          return i;
        });
        const newA = { ...a };
        delete newA.count;
        delete newA.total;
        delete newA.cartId;
        delete newA.galleries;
        const newB = { ...b };
        delete newB.count;
        delete newB.total;
        delete newB.cartId;
        delete newB.galleries;
        return JSON.stringify(recurseCheck(newA)) === JSON.stringify(recurseCheck(newB));
      }

      AddToCart() {
        const {
          myItem, addAttrib, updateCart, addToCart, allCart,
        } = this.props;
        const updatePrice = document.querySelector('#product');
        const priceValue = updatePrice.dataset.id;
        const obj = {};
        obj.cartId = uuidv4();
        obj.count = myItem.count;
        obj.count += 1;
        obj.total = obj.count * parseFloat(priceValue);
        obj.attributes = this.attribClass;
        obj.galleries = { gallery: [...this.galleries], currentGallery: this.galleries[0] };
        addAttrib(obj);
        const newObj = { ...myItem, ...obj };
        const newCart = [newObj];
        let counter = 0;
        const updatedCart = allCart.map((oldObj) => {
          if (this.compareObjects(oldObj, newObj)) {
            oldObj.count += 1;
            oldObj.total = oldObj.count * parseFloat(priceValue);
            counter += 1;
          }

          return oldObj;
        });

        if (counter < 1) {
          addToCart(newCart);
          counter = 0;
        } else {
          updateCart(updatedCart);
        }
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
                name, gallery, prices, attributes,
              } = product;
              const element = product?.description;
              this.attribClass = attributes;
              this.galleries = gallery;
              this.prices = prices;

              if (cartReducer === null) {
                selectImage({ image: gallery[0] });
              }
              return (
                <div className="d-flex justify-content-c details-main">
                  <div className="container d-flex details-container">
                    <div className="d-flex flex-direction-column all-image">
                      {gallery.map((pictureUrl) => (
                        <div role="none" key={pictureUrl} onMouseDown={() => this.getDetails(pictureUrl)}>
                          <img alt={name} src={`${pictureUrl}`} style={{ width: '90px', height: 'auto' }} />
                        </div>
                      ))}
                    </div>
                    <div className="details-image-main"><img alt={name} src={`${cartReducer ? cartReducer.image : gallery[0]}`} style={{ width: '100%', height: 'auto' }} /></div>
                    <div className="details-contents" style={{}}>
                      <p className='details-product-name'>{name}</p>
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
                        <p className='cart-attrib-price'>prices :</p>
                        {prices.filter(({ currency }) => currency.symbol === symbol)
                          .map(({ currency, amount }) => <p className="details-amount" id="product" data-id={amount} key={currency.symbol}>{`${currency.symbol} ${amount}`}</p>)}
                      </div>
                      <div className="button-contain">
                        <Link to="/cart"><button onClick={this.AddToCart} disabled={false} className="details-button" type="button">ADD TO CART</button></Link>
                      </div>
                      <div className="descriptionBody" dangerouslySetInnerHTML={{ __html: element }} />
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
