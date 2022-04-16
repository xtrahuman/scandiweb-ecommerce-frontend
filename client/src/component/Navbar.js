import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../Images/a-logo.svg'
import cartLogo from '../Images/cartlogo.svg'
import { FaAngleDown } from 'react-icons/fa'

class Navbar extends React.Component {
constructor(props){
  super(props)
  this.state = {
    dropDisplay: false,
    currency: this.props.data.currencies[0].symbol
  }

  this.toggleDropdown = this.toggleDropdown.bind(this)
  this.selectSymbol = this.selectSymbol.bind(this)
}

 toggleDropdown = () => this.setState(({dropDisplay}) => ({ 
  dropDisplay: !dropDisplay
}))
 
 selectSymbol = (symbol) => {
  this.setState((prevState)=>({ dropDisplay: !prevState.dropDisplay,currency: symbol}))
  const {getSymbol} = this.props
  getSymbol(symbol)
 }
 
render (){
  const { dropDisplay, currency } = this.state
  const { data, getNavName } = this.props
    return (
    <nav className="navbar d-flex">
    <div className="d-flex navbar-container container">
    <ul className='d-flex navs'>
    {data.categories.map(({ name }) => (
    <li key={name}>
      <NavLink to = {`/${name}`} onClick={()=> getNavName(name)}>
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
     <img src={cartLogo} style={{cursor:'pointer'}} alt = 'cart' />
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

export {Navbar as default}
