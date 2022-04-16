import React from 'react';
import {increment, decrement}  from '../redux/actions'
import { connect } from "react-redux";
import { Outlet } from 'react-router-dom';

class Category extends React.Component {

    render() {
       const {data, categoryName, symbol, counter, decrement, increment} = this.props
       const currentCategory = data.categories.filter(({name}) => name === categoryName)
        return (
            <>
            <div className='d-flex justify-content-c'>
            {currentCategory.map(({name, products}) => (
            <div className= 'container d-flex category-container'key={name}>
            <h1 style={{textTransform:'capitalize'}}>{name}</h1>
            <p>{counter}</p>
            <span style={{cursor:'pointer'}} onClick={()=>decrement()}>-</span>
            <span style={{cursor:'pointer'}} onClick={()=>increment()}>+</span>
             <div className='d-flex row'>
             {products.map(({id, name, gallery, prices})=>
             <div className='d-flex card' key={id}>
             <div className='d-flex card-container'>
             <div className='img-container'><img src={gallery[0]} style={{width: '100%', height: '350px', objectFit:'contain'}} alt={id}/></div>
             <p className='card-name'>{name}</p>
            {prices.filter(({currency}) => currency.symbol === symbol)
            .map(({currency,amount}) => 
            <p className='card-name' key={currency.symbol}>{`${currency.symbol} ${amount}`}</p>
            )}
             </div>
             </div>
             )}
             </div>
            </div>
            ))}
            </div>
            </>
        )
    }
}

const actionCreators = {
    increment,
    decrement,
  }

function mapStateToProps(state) {
    const counter = state.counter;
    return {
      counter
    };
  }

  
export default connect(mapStateToProps,actionCreators)(Category);
