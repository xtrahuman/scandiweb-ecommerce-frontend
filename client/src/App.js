import React from 'react';
import Navbar from './component/Navbar';
import Category from './component/category'
import Details from './component/details';
import Cart from './component/cart';
import MiniCart from './component/miniCart';
import { Route, Routes } from 'react-router-dom';
import {Query} from '@apollo/client/react/components'
import {gql} from "@apollo/client";
import { connect } from "react-redux";

class App extends React.Component {
  constructor(props){
    super(props)
    this.nav = JSON.parse(localStorage.getItem('current_category'))
    this.state = {
      NavName: this.nav ? this.nav : 'all',
      symbol: '$',
      iconElem: '',
      symbolWrap: '',
    }

    this.ALL_QUERY = gql`
  query AllQuery{
    categories{
    name,
    products{
      id,
      name,
      inStock,
      gallery,
      prices{
        currency{
         symbol,
         label
       },
         amount
       }
    }
  }

  currencies{
    label,
    symbol
  }
}
`
    this.getNavName = this.getNavName.bind(this)
  }


  componentDidUpdate = () => {
    const { miniCartActive } = this.props
    if (miniCartActive) {
      document.body.classList.add('static')
    }else {
      document.body.classList.remove('static')
    }
  }


  getNavName = (name) => {
    this.setState({...this.state, NavName: name})
    localStorage.removeItem('current_cart')
  }
   
  getSymbol = (symbol) => this.setState({...this.state, symbol: symbol})
  
  getRefForSibling = (iconElem, symbolWrap) =>  this.setState({...this.state, iconElem: iconElem, symbolWrap: symbolWrap})
   

 render () {
  const {NavName, symbol, iconElem, symbolWrap } = this.state
  const { miniCartActive } = this.props
  return (
    <Query query={this.ALL_QUERY}>
    {({ loading, error, data }) => {
        if (error) return <h1>Error...</h1>;
        if (loading || !data) return <h1>Loading...</h1>

  return (
    <div className="App">
     <Navbar getRefForSibling={this.getRefForSibling} data = {data} getNavName={this.getNavName} getSymbol={this.getSymbol} />
     <div className='app-container'>
       <div className={`${miniCartActive ? 'app-overlay' : ''}`}></div>
     <Routes>
      <Route path="/" element={<Category categoryName={NavName} symbol={symbol}/>} />
      {data.categories.map(({name}) => 
      <Route key={name}>
      <Route path={`/${name}`}  element={<Category categoryName={NavName} symbol={symbol}/>} /> 
      <Route path={`/${name}/:id`} element={<Details superData={data} categoryName={NavName} symbol={symbol}/>}/>
      </Route>
    )}
      <Route path="/cart" element={<Cart/>}/>
       </Routes>
      <MiniCart iconElem={iconElem} symbolWrap={symbolWrap} cartDisplay={miniCartActive ? 'minicart-active' : ''} />
      </div>
    </div>
  )
}}
</Query>
  )
}

}

function mapStateToProps(state) {
  const miniCartActive = state.miniCartActive
  return {
    miniCartActive,
  };
}

export default connect(mapStateToProps)(App);

