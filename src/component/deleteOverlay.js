import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { displayDelete } from '../redux/display/action';
import { deleteItem } from '../redux/cart/editCart/actions';
import updateCart from '../redux/cart/addCart/action';

class DeleteOverlay extends React.PureComponent {
  constructor(props) {
    super(props);
    this.deleteHandler = this.deleteHandler.bind(this);
  }

      deleteHandler = (index) => {
        const {
          allCart, displayDelete, updateCart, deleteItem,
        } = this.props;
        deleteItem(allCart, index, updateCart);
        displayDelete();
      }

      render() {
        const { displayDelete, deleteDisplay, getIndex } = this.props;
        return (
          <div className="d-flex justify-content-c">
            <div className={`${deleteDisplay ? 'delete-overlay' : 'remove-delete-overlay'}`}>
              <div className="alert-delete">
                <p>Are you sure you want to delete this item?</p>
                <div className="alert-popup-btns">
                  <button onMouseDown={() => displayDelete()} className="details-button order-btn" type="button">Cancel</button>
                  <button onMouseDown={() => this.deleteHandler(getIndex)} className="details-button delete-btn order-btn" type="button">Delete</button>

                </div>
              </div>
            </div>
          </div>
        );
      }
}

const actionCreators = {
  displayDelete,
  deleteItem,
  updateCart,
};

function mapStateToProps(state) {
  const { allCart } = state;
  const { deleteDisplay } = state;
  const { getIndex } = state;
  return {
    allCart,
    deleteDisplay,
    getIndex,
  };
}

DeleteOverlay.propTypes = {
  allCart: PropTypes.instanceOf(Array).isRequired,
  deleteItem: PropTypes.func.isRequired,
  getIndex: PropTypes.number.isRequired,
  displayDelete: PropTypes.func.isRequired,
  deleteDisplay: PropTypes.bool.isRequired,
  updateCart: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actionCreators)(DeleteOverlay);
