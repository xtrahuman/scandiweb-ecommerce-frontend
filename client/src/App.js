import React from 'react';
import Navbar from './component/Navbar';
import Category from './component/category'
import { Route, Routes } from 'react-router-dom';
import {Query} from '@apollo/client/react/components'
import {gql} from "@apollo/client";


const ALL_QUERY = gql`
  query AllQuery{
    categories{
    name,
    products{
      id,
      name,
      inStock,
      gallery
    }
  }

  currencies{
    label,
    symbol
  }
}
`
class App extends React.Component {
  constructor(){
    super()
    this.state = {
      NavName: 'all'
    }
    this.getNavName = this.getNavName.bind(this)
  }

  getNavName = (name) => this.setState({NavName: name})

 render () {
  const {NavName} = this.state
  return (
    <Query query={ALL_QUERY}>
    {({ loading, error, data }) => {
        if (error) return <h1>Error...</h1>;
        if (loading || !data) return <h1>Loading...</h1>

  return (
    <div className="App">
     <Navbar data = {data} getNavName={this.getNavName} />
     <h1>App</h1>
     <Routes>
      <Route path="/" element={<Category data={data} categoryName={NavName}/>} />
      <Route path="/clothes" element={<Category data={data} categoryName={NavName}/>} />
      <Route path="/tech" element={<Category data={data} categoryName={NavName}/>} />
     </Routes>
    </div>
  )
}}
</Query>
  )
}

}

export default App;
