import React from 'react';
import { connect } from "react-redux";
import toggleMiniCart from '../redux/display/action';
import { NavLink } from 'react-router-dom';
import logo from '../Images/a-logo.svg'
import cartLogo from '../Images/cartlogo.svg'
import { FaAngleDown } from 'react-icons/fa'

class Navbar extends React.Component {
constructor(props){
  super(props)
  this.state = {
    dropDisplay: false,
    currency: this.props.data.currencies[0].symbol,
    miniCartActive: false
  }

  this.cartIconRef = React.createRef();

  this.toggleDropdown = this.toggleDropdown.bind(this)
  this.selectSymbol = this.selectSymbol.bind(this)
  // this.toggleMiniCart = this.toggleMiniCart.bind(this)
}

componentDidMount () {
  const {getSymbol, getRefForSibling, productData} = this.props
  const iconElem = this.cartIconRef.current
  console.log(iconElem)
  getRefForSibling(iconElem)
}

 toggleDropdown = () => this.setState(({dropDisplay}) => ({ 
  dropDisplay: !dropDisplay
}))
 
 selectSymbol = (symbol) => {
  this.setState((prevState)=>({ dropDisplay: !prevState.dropDisplay,currency: symbol}))
  const {getSymbol, productData} = this.props
  getSymbol(symbol)
  console.log(this.cartIconRef.current)
 }

//  toggleMiniCart = () => {
//    const {getMiniCartstate} = this.props
//    this.setState({miniCartActive: !this.state.miniCartActive},() =>getMiniCartstate(this.state.miniCartActive))
    
//  }

componentWillUnmount ()  {
  const {miniCartActive, toggleMiniCart} = this.props
  if(!miniCartActive){
    this.cartIconRef.current.removeEventListener("click", toggleMiniCart())
  }
}

 
 
render (){
  const { dropDisplay, currency } = this.state
  const { data, getNavName, toggleMiniCart} = this.props
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
      <div className="d-flex currency-icons" onClick = {this.toggleDropdown}>
      <span >{ currency }</span>
      <span ><FaAngleDown style={{width: '10px', height: '10px'}}/></span>
      </div>
     <ul className="d-flex currency" style= {{ display: dropDisplay ?  'flex' : 'none'}}>{data.currencies.map(({label, symbol}) => 
     <li key={label} onClick = {()=>this.selectSymbol(symbol)}><span className='sym'>{symbol}</span>{label}</li>)}</ul>
     <div ref={this.cartIconRef} onClick={() => toggleMiniCart()}><img src={cartLogo} style={{cursor:'pointer'}} alt = 'cart' /></div>
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
}

function mapStateToProps(state) {
  const miniCartActive = state.miniCartActive
  return {
    miniCartActive,
  };
}

export default connect(mapStateToProps,actionCreators)(Navbar);
