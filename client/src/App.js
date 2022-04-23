import React from 'react';
import Navbar from './component/Navbar';
import Category from './component/category'
import Details from './component/details';
import { Route, Routes } from 'react-router-dom';
import {Query} from '@apollo/client/react/components'
import {gql} from "@apollo/client";

class App extends React.Component {
  constructor(){
    super()
    this.nav = JSON.parse(localStorage.getItem('current_category'))
    this.state = {
      NavName: this.nav ? this.nav : 'all',
      symbol: '$'
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

  getNavName = (name) => {
    this.setState({...this.state, NavName: name})
    localStorage.removeItem('current_cart')
  }
   
  getSymbol = (symbol) => this.setState({...this.state, symbol: symbol})

 render () {
  const {NavName, symbol} = this.state
  return (
    <Query query={this.ALL_QUERY}>
    {({ loading, error, data }) => {
        if (error) return <h1>Error...</h1>;
        if (loading || !data) return <h1>Loading...</h1>

  return (
    <div className="App">
     <Navbar data = {data} getNavName={this.getNavName} getSymbol={this.getSymbol} />
     <Routes>
      <Route path="/" element={<Category categoryName={NavName} symbol={symbol}/>} />
      {data.categories.map(({name}) => 
      <Route key={name}>
      <Route path={`/${name}`}  element={<Category categoryName={NavName} symbol={symbol}/>} /> 
      <Route path={`/${name}/:id`} element={<Details superData={data} categoryName={NavName} symbol={symbol}/>}/>
      </Route>
    )}
      <Route path={`/cart`} element={<Cart/>}/>
       </Routes>
    </div>
  )
}}
</Query>
  )
}

}

export default App;
