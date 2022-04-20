import React from 'react';
import {increment, decrement}  from '../redux/actions'
import {fetchCategory} from '../redux/category/action'
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import {Query} from '@apollo/client/react/components'

class Category extends React.Component {

  constructor(props) {
    super(props)
    this.props.fetchCategory(this.props.categoryName)
  }

  componentDidMount() {
    this.props.fetchCategory(this.props.categoryName)
  }

  componentDidUpdate() {
    this.props.fetchCategory(this.props.categoryName)
  }
  

    render() {
       const {CATEGORY_QUERY, categoryName, symbol, counter, decrement, increment} = this.props
      return (
       <Query query={CATEGORY_QUERY}>
    {({ loading, error, data }) => {
        if (error) return <h1>Error...</h1>;
        if (loading || !data) return <h1>Loading...</h1>
        console.log(data)
        return (
            <>
            <div className='d-flex justify-content-c'>
            {
            <div className= 'container d-flex category-container'>
            <h1 style={{textTransform:'capitalize'}}>{data.category.name}</h1>
            <p>{counter}</p>
            <span style={{cursor:'pointer'}} onClick={()=>decrement()}>-</span>
            <span style={{cursor:'pointer'}} onClick={()=>increment()}>+</span>
             <div className='d-flex row'>
             {data.category.products.map(({id, name, gallery, prices})=>
             <div className='d-flex card' key={id}>
             <div className='d-flex card-container'>
             <div className='img-container'><img src={gallery[0]} style={{width: '100%', height: '350px', objectFit:'contain'}} alt={id}/></div>
             <Link to={`/${categoryName}/${id}`}><p className='card-name'>{name}</p></Link>
            {prices.filter(({currency}) => currency.symbol === symbol)
            .map(({currency,amount}) => 
            <p className='card-name' key={currency.symbol}>{`${currency.symbol} ${amount}`}</p>
            )}
             </div>
             </div>
             )}
             </div>
            </div>
            }
            </div>
            </>
        )
      }}
      </Query>
        )
    }
}


const actionCreators = {
    increment,
    decrement,
    fetchCategory,
  }

function mapStateToProps(state) {
    const counter = state.counter;
    const CATEGORY_QUERY = state.categoryReducer
    return {
      counter,
      CATEGORY_QUERY,
    };
  }

  
export default connect(mapStateToProps,actionCreators)(Category);
