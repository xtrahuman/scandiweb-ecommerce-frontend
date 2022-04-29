import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaAngleDown } from 'react-icons/fa';
import PropTypes from 'prop-types';
import toggleMiniCart, { toggleDropdown } from '../redux/display/action';
import logo from '../Images/a-logo.svg';
import cartLogo from '../Images/cartlogo.svg';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    const { currencies } = data;
    const { symbol } = currencies[0];
    this.state = {
      currency: symbol,
    };

    this.cartIconRef = React.createRef();
    this.symbolWrapRef = React.createRef();
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.selectSymbol = this.selectSymbol.bind(this);
  }

  componentDidMount() {
    const { getRefForSibling } = this.props;
    const iconElem = this.cartIconRef.current;
    const symbolWrap = this.symbolWrapRef.current;
    getRefForSibling(iconElem, symbolWrap);
  }

 toggleDropdown = () => {
   const { toggleDropdown } = this.props;
   toggleDropdown();
 }

 selectSymbol = (symbol) => {
   this.setState(() => ({ currency: symbol }));
   const { getSymbol, toggleDropdown } = this.props;
   toggleDropdown();
   getSymbol(symbol);
 }

 render() {
   const { currency } = this.state;
   const {
     data, allCart, getNavName, toggleMiniCart, dropDownActive,
   } = this.props;
   const { categories, currencies } = data;
   let Qty = 0;
   allCart?.map(({ count }) => {
     Qty += count;
     return Qty;
   });
   return (
     <nav className="navbar d-flex">
       <div className="d-flex navbar-container container">
         <ul className="d-flex navs">
           {categories.map(({ name }) => (
             <li key={name}>
               <NavLink className={(navData) => (navData.isActive ? 'active-link' : '')} to={`/${name}`} onClick={() => getNavName(name)}>
                 {name}
               </NavLink>
             </li>
           ))}
         </ul>
         <img src={logo} alt="logo" />
         <div className="currency-dropdown d-flex">
           <div role="none" ref={this.symbolWrapRef} className="d-flex currency-icons" onMouseDown={this.toggleDropdown}>
             <span>{ currency }</span>
             <span><FaAngleDown style={{ width: '10px', height: '10px' }} /></span>
           </div>
           <ul className="d-flex currency" style={{ display: dropDownActive ? 'flex' : 'none' }}>
             {currencies.map(({ label, symbol }) => (
               <li key={label}>
                 <div role="none" onMouseDown={() => this.selectSymbol(symbol)}>
                   <span className="sym">{symbol}</span>
                   {label}
                 </div>
               </li>
             ))}
           </ul>
           <div role="none" className="cart-icon" ref={this.cartIconRef} onMouseDown={() => toggleMiniCart()}>
             <div className={Qty && Qty > 0 ? 'badge-qty' : 'badge-display-off'}><div>{ Qty }</div></div>
             {' '}
             <img src={cartLogo} alt="cart" />
           </div>
         </div>
       </div>
     </nav>
   );
 }
}

// Add this in your component file to check if dom is different
// require('react-dom');
// window.React2 = require('react');

// console.log(window.React1 === window.React2);

const actionCreators = {
  toggleMiniCart,
  toggleDropdown,
};

function mapStateToProps(state) {
  const { allCart } = state;
  const { dropDownActive } = state;
  return {
    allCart,
    dropDownActive,
  };
}

Navbar.propTypes = {
  allCart: PropTypes.instanceOf(Array).isRequired,
  dropDownActive: PropTypes.bool.isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
  getNavName: PropTypes.func.isRequired,
  getSymbol: PropTypes.func.isRequired,
  categories: PropTypes.instanceOf(Object).isRequired,
  currencies: PropTypes.instanceOf(Object).isRequired,
  getRefForSibling: PropTypes.func.isRequired,
  toggleMiniCart: PropTypes.func.isRequired,
  toggleDropdown: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actionCreators)(Navbar);
