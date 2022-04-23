import React from "react";
import {increment, decrement}  from '../redux/actions'
import { connect } from "react-redux";

class Cart extends React.Component {
    render (){
        const {increment,decrement, counter} = this.props
        return(
            <div className="d-flex justify-content-c">
              <div className="d-flex container flex-direction-column">
                <h2>CART</h2>
                <div className="d-flex justify-content-between cart-border-line">
                    <div className="d-flex flex-direction-column">
                        <h3>Apollo</h3>
                        <p>$50</p>
                        <p>size:</p>
                        <div className="d-flex">
                            <p>s</p>
                            <p>m</p>
                        </div>
                    </div>
                    <div className="d-flex cart-counter-image">
                        <div className="d-flex flex-direction-column cart-counter">
                            <div onClick={increment} className="d-flex counter-change"><span >+</span></div>
                            <p>{counter}</p>
                            <div onClick={decrement} className="d-flex counter-change"><span >-</span></div>
                        </div>
                        <div>image</div>
                    </div>
                    
                </div>
            </div>
        </div>
        )
    }
}

const actionCreators = {
    increment,
    decrement,
  }

function mapStateToProps(state) {
    const counter = state.counter;
    const CATEGORY_QUERY = state.categoryReducer
    return {
      counter,
      CATEGORY_QUERY,
    };
  }

  export default connect(mapStateToProps,actionCreators)(Cart);
