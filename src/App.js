import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Query } from '@apollo/client/react/components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from './component/Navbar';
import Category from './component/category';
import Details from './component/details';
import Cart from './component/cart';
import MiniCart from './component/miniCart';
import toggleMiniCart from './redux/display/action';
import DeleteOverlay from './component/deleteOverlay';
import { ALL_QUERY } from './redux/queries/queries';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.nav = JSON.parse(localStorage.getItem('current_category'));
    this.state = {
      NavName: this.nav ? this.nav : 'all',
      symbol: '$',
      iconElem: '',
      symbolWrap: '',
    };

    this.getNavName = this.getNavName.bind(this);
    this.closeMiniCart = this.closeMiniCart.bind(this);
  }

  componentDidUpdate = () => {
    const { miniCartActive } = this.props;
    if (miniCartActive) {
      document.body.classList.add('static');
    } else {
      document.body.classList.remove('static');
    }
  }

  closeMiniCart = () => {
    const {
      miniCartActive, toggleMiniCart,
    } = this.props;
    if (miniCartActive) {
      toggleMiniCart();
    }
  }

  getNavName = (name) => {
    this.setState({ NavName: name });
    localStorage.removeItem('current_cart');
  }

  getSymbol = (symbol) => this.setState({ symbol })

  getRefForSibling = (iconElem, symbolWrap) => this.setState({ iconElem, symbolWrap })

  render() {
    const {
      NavName, symbol, iconElem, symbolWrap,
    } = this.state;
    const { miniCartActive } = this.props;
    return (
      <Query query={ALL_QUERY}>
        {({ loading, error, data }) => {
          if (error) return <h1>Error...</h1>;
          if (loading || !data) return <h1>Loading...</h1>;

          return (
            <div className="App">
              <Navbar
                getRefForSibling={this.getRefForSibling}
                data={data}
                getNavName={this.getNavName}
                getSymbol={this.getSymbol}
              />
              <div className="app-container">
                <DeleteOverlay />
                <div role="none" onMouseDown={this.closeMiniCart} className={`${miniCartActive ? 'app-overlay' : ''}`} />
                <Routes>
                  <Route path="/" element={<Category categoryName={NavName} symbol={symbol} />} />
                  {data.categories.map(({ name }) => (
                    <Route key={name}>
                      <Route path={`/${name}`} element={<Category categoryName={NavName} symbol={symbol} />} />
                      <Route path={`/${name}/:id`} element={<Details superData={data} categoryName={NavName} symbol={symbol} />} />
                    </Route>
                  ))}
                  <Route path="/cart" element={<Cart symbol={symbol} />} />
                </Routes>
                <MiniCart iconElem={iconElem} symbol={symbol} symbolWrap={symbolWrap} cartDisplay={miniCartActive ? 'minicart-active' : ''} />
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

const actionCreators = {
  toggleMiniCart,
};

function mapStateToProps(state) {
  const { miniCartActive } = state;
  return {
    miniCartActive,
  };
}

App.propTypes = {
  miniCartActive: PropTypes.bool.isRequired,
  toggleMiniCart: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actionCreators)(App);
