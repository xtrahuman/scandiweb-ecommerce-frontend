import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Query } from '@apollo/client/react/components';
import addCartLogo from '../Images/addCartLogo.svg';
import addAttrib, { switchHandler, getProduct, handleAddLogic } from '../redux/Item/action';
import updateCart, { addToCart } from '../redux/cart/addCart/action';
import { fetchCategory } from '../redux/category/action';

class Category extends React.Component {
  constructor(props) {
    super(props);
    const { categoryName, fetchCategory } = this.props;
    fetchCategory(categoryName);
    this.toggleQuickShop = this.toggleQuickShop.bind(this);
    this.selectSwatch = this.selectSwatch.bind(this);
    this.selectNotSwatch = this.selectNotSwatch.bind(this);
    this.AddToCart = this.AddToCart.bind(this);
  }

  componentDidMount() {
    const { categoryName, fetchCategory } = this.props;
    fetchCategory(categoryName);
  }

  componentDidUpdate() {
    const { categoryName, fetchCategory } = this.props;
    fetchCategory(categoryName);
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

   removeAttrib = (attributes) => {
     attributes.forEach(({ name }) => {
       const attribName = name.split(' ').join('');
       const parentElement = document.querySelectorAll(`.${attribName}`);
       parentElement.forEach((element) => {
         element.classList.forEach((classes) => {
           if (classes === 'active-swatch' || classes === 'Active-not-swatch') {
             element.classList.remove('active-swatch');
             element.classList.remove('Active-not-swatch');
           }
         });
       });
     });
   }

  toggleQuickShop = (index, attributes) => {
    const { getProduct } = this.props;
    const allQuickShop = document.querySelectorAll('.quick-shop');
    const card = document.querySelectorAll('.card')[index];
    const imgOverlay = document.querySelectorAll('.img-overlay');
    const name = card.dataset.product;
    let obj = {};

    if (!allQuickShop[index].classList.value.includes('open-shop')) {
      allQuickShop[index].classList.add('open-shop');
      imgOverlay[index].classList.add('opaque-shop');
      obj = { name, count: 0 };
      getProduct(obj);
    } else {
      allQuickShop[index].classList.remove('open-shop');
      imgOverlay[index].classList.remove('opaque-shop');
      obj = {};
      getProduct(obj);
      this.removeAttrib(attributes);
    }

    allQuickShop.forEach((QuickShop) => {
      if (QuickShop.classList.value.includes('open-shop') && allQuickShop[index] && !allQuickShop[index].contains(QuickShop)) {
        QuickShop.classList.remove('open-shop');
      }
    });

    imgOverlay.forEach((card) => {
      if (card.classList.value.includes('opaque-shop') && imgOverlay[index] && !imgOverlay[index].contains(card)) {
        card.classList.remove('opaque-shop');
        this.removeAttrib(attributes);
      }
    });
  }

  AddToCart = (attributes, gallery, index, prices) => {
    const {
      myItem, addAttrib, updateCart, addToCart, allCart, getProduct,
    } = this.props;
    handleAddLogic(myItem, addAttrib, updateCart, addToCart, allCart, prices, attributes, gallery);
    const allQuickShop = document.querySelectorAll('.quick-shop');
    const imgOverlay = document.querySelectorAll('.img-overlay');
    allQuickShop[index].classList.remove('open-shop');
    imgOverlay[index].classList.remove('opaque-shop');
    const obj = {};
    getProduct(obj);
    this.removeAttrib(attributes);
  }

  render() {
    const { CATEGORY_QUERY, categoryName, symbol } = this.props;
    return (
      <Query query={CATEGORY_QUERY}>
        {({ loading, error, data }) => {
          if (error) return <h1>Error...</h1>;
          if (loading || !data) return <h1>Loading...</h1>;
          return (
            <>
              <div className="d-flex justify-content-c">
                <div className="container d-flex category-container">
                  <h1 className="page-title" style={{ textTransform: 'capitalize' }}>{data.category.name}</h1>
                  <div className="d-flex row">
                    {data.category.products.map(({
                      inStock, id, name, gallery, prices, attributes,
                    }, index) => (
                      <div data-product={name} className="d-flex card" key={id}>
                        <div className="d-flex card-container">
                          <div className="img-container">
                            <p className={`${inStock ? 'alert-off' : 'out-of-stock'}`}>out of stock</p>
                            <div className="img-overlay" />
                            <div className="quick-shop flex-direction-column">
                              {attributes.map(({
                                id, name, type, items,
                              }) => (
                                <div key={id}>
                                  <p className="cart-attrib-name shop-attrib-name">{`${name} :`}</p>
                                  <div className="d-flex details-attributes">
                                    {
                        items.map(({ id, displayValue }) => (
                          <div key={id}>
                            {
                                type === 'swatch'
                                  ? (
                                    <div>
                                      <div role="none" ref={this.MuiltRefFunc} data-id={displayValue} onMouseDown={(e) => this.selectSwatch(e, name, displayValue)} className={`swatch-container ${name.split(' ').join('')}`}>
                                        <div className="swatch swatch-quickshop" style={{ backgroundColor: displayValue }} />
                                      </div>
                                    </div>
                                  )
                                  : (
                                    <div>
                                      <div role="none" ref={this.MuiltRefFunc} data-id={displayValue} onMouseDown={(e) => this.selectNotSwatch(e, name, displayValue)} className={`d-flex not-swatch not-swatch-quickshop ${name.split(' ').join('')}`}>
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
                              <div className="button-contain">
                                <button onClick={() => this.AddToCart(attributes, gallery, index, prices)} disabled={false} className="details-button quick-shop-btn" type="button">ADD</button>
                              </div>
                            </div>
                            <div className={`${inStock ? '' : 'img-opacity'} category-image-contain`}>
                              <img src={gallery[0]} style={{ width: '100%', height: '300px', objectFit: 'contain' }} alt={id} />
                              <div role="none" onMouseDown={() => this.toggleQuickShop(index, attributes)} className="add-cart-logo"><img src={addCartLogo} alt="addCart" /></div>
                            </div>
                          </div>
                          <Link to={`${inStock ? `/${categoryName}/${id}` : '#'}`}><p className={`${inStock ? 'enable-hover' : 'disabled'} card-name`}>{name}</p></Link>
                          {prices.filter(({ currency }) => currency.symbol === symbol)
                            .map(({ currency, amount }) => <p className={`${inStock ? '' : 'disabled'} card-name`} key={currency.symbol}>{`${currency.symbol} ${amount}`}</p>)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          );
        }}
      </Query>
    );
  }
}

const actionCreators = {
  fetchCategory,
  addAttrib,
  getProduct,
  addToCart,
  updateCart,
};

function mapStateToProps(state) {
  const CATEGORY_QUERY = state.categoryReducer;
  const myItem = state.itemReducer;
  const { allCart } = state;
  return {
    CATEGORY_QUERY,
    myItem,
    allCart,
  };
}

Category.propTypes = {
  CATEGORY_QUERY: PropTypes.instanceOf(Object).isRequired,
  myItem: PropTypes.instanceOf(Object).isRequired,
  allCart: PropTypes.instanceOf(Array).isRequired,
  fetchCategory: PropTypes.func.isRequired,
  addAttrib: PropTypes.func.isRequired,
  getProduct: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
  categoryName: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, actionCreators)(Category);
