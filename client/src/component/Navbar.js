import React from 'react';
import { connect } from "react-redux";
import toggleMiniCart, { toggleDropdown } from '../redux/display/action';
import { NavLink } from 'react-router-dom';
import logo from '../Images/a-logo.svg'
import cartLogo from '../Images/cartlogo.svg'
import { FaAngleDown } from 'react-icons/fa'

class Navbar extends React.Component {
constructor(props){
  super(props)
  this.state = {
    currency: this.props.data.currencies[0].symbol
  }

  this.cartIconRef = React.createRef();
  this.symbolWrapRef = React.createRef()
  this.toggleDropdown = this.toggleDropdown.bind(this)
  this.selectSymbol = this.selectSymbol.bind(this)
}

componentDidMount () {
  const { getRefForSibling } = this.props
  const iconElem = this.cartIconRef.current
  const symbolWrap = this.symbolWrapRef.current
  console.log(iconElem)
  getRefForSibling(iconElem, symbolWrap)
  console.log(symbolWrap)
}

 toggleDropdown = () => {
   const { toggleDropdown } = this.props
    toggleDropdown()

 }
 
 selectSymbol = (symbol) => {
  this.setState(()=>({ currency: symbol}))
  const {getSymbol, toggleDropdown} = this.props
  toggleDropdown()
  getSymbol(symbol)
 }

render (){
  const { currency } = this.state
  const { data,allCart, getNavName, toggleMiniCart, dropDownActive} = this.props
  console.log(dropDownActive)
  let Qty = 0
  allCart?.map(({count}) => {
    Qty += count
    })
    return (
    <nav className="navbar d-flex">
    <div className="d-flex navbar-container container">
    <ul className='d-flex navs'>
    {data.categories.map(({ name }) => (
    <li key={name}>
      <NavLink className={(navData) => (navData.isActive ? 'active-link' : '')} to = {`/${name}`} onClick={()=> getNavName(name)}>
        {name}
      </NavLink>
    </li>
  ))}
   </ul>
    <img src={logo} alt='logo' />
    <div className="currency-dropdown d-flex">
      <div ref={this.symbolWrapRef} className="d-flex currency-icons" onClick = {this.toggleDropdown}>
      <span >{ currency }</span>
      <span ><FaAngleDown style={{width: '10px', height: '10px'}}/></span>
      </div>
     <ul className="d-flex currency" style= {{ display: dropDownActive ?  'flex' : 'none'}}>{data.currencies.map(({label, symbol}) => 
     <li key={label} onClick = {()=>this.selectSymbol(symbol)}><span className='sym'>{symbol}</span>{label}</li>)}
     </ul>
     <div className='cart-icon' ref={this.cartIconRef} onClick={() => toggleMiniCart()}><div className={Qty && Qty > 0 ?'badge-qty' : 'badge-display-off'}><div>{ Qty }</div></div> <img src={cartLogo} alt = 'cart' /></div>
     </div>
     </div>
    </nav>
    )
 
}
 


}

// Add this in your component file
require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);


const actionCreators = {
  toggleMiniCart,
  toggleDropdown,
}

function mapStateToProps(state) {
  const allCart = state.allCart
  const miniCartActive = state.miniCartActive
  const dropDownActive = state.dropDownActive
  return {
    miniCartActive,
    allCart,
    dropDownActive
  };
}

export default connect(mapStateToProps,actionCreators)(Navbar);
