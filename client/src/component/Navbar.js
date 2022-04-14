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
}

 toggleDropdown = () => this.setState(({dropDisplay}) => ({ 
  dropDisplay: !dropDisplay
}))

render (){
  const { dropDisplay, currency } = this.state
  const { data, getNavName } = this.props
  console.log(dropDisplay)

    return (
    <nav className="navbar d-flex">
    <div className="d-flex navbar-container">
    <ul className='d-flex navs'>
    {data.categories.map(({ name }) => (
    <li key={name}>
      <NavLink to = {name === 'all' ? '/' : `/${name}`} onClick={()=> getNavName(name)}>
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
     <ul className="d-flex currency" style= {{ display: dropDisplay ?  'flex' : 'none'}}>{data.currencies.map(({label, symbol}) => <li key={label} onClick = {()=>this.setState(({dropDisplay})=>({ dropDisplay: !dropDisplay,currency: symbol}))}><span className='sym'>{symbol}</span>{label}</li>)}</ul>
     <img src={cartLogo} alt = 'cart' />
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
