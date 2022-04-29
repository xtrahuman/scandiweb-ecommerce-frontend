import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Query } from '@apollo/client/react/components';
import { fetchCategory } from '../redux/category/action';

class Category extends React.Component {
  constructor(props) {
    super(props);
    const { categoryName, fetchCategory } = this.props;
    fetchCategory(categoryName);
  }

  componentDidMount() {
    const { categoryName, fetchCategory } = this.props;
    fetchCategory(categoryName);
  }

  componentDidUpdate() {
    const { categoryName, fetchCategory } = this.props;
    fetchCategory(categoryName);
  }

  render() {
    const { CATEGORY_QUERY, categoryName, symbol } = this.props;
    return (
      <Query query={CATEGORY_QUERY}>
        {({ loading, error, data }) => {
          if (error) return <h1>Error...</h1>;
          if (loading || !data) return <h1>Loading...</h1>;
          return (
            <>
              <div className="d-flex justify-content-c">
                <div className="container d-flex category-container">
                  <h1 className="page-title" style={{ textTransform: 'capitalize' }}>{data.category.name}</h1>
                  <div className="d-flex row">
                    {data.category.products.map(({
                      id, name, gallery, prices,
                    }) => (
                      <div className="d-flex card" key={id}>
                        <div className="d-flex card-container">
                          <div className="img-container"><img src={gallery[0]} style={{ width: '100%', height: '350px', objectFit: 'contain' }} alt={id} /></div>
                          <Link to={`/${categoryName}/${id}`}><p className="card-name">{name}</p></Link>
                          {prices.filter(({ currency }) => currency.symbol === symbol)
                            .map(({ currency, amount }) => <p className="card-name" key={currency.symbol}>{`${currency.symbol} ${amount}`}</p>)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          );
        }}
      </Query>
    );
  }
}

const actionCreators = {
  fetchCategory,
};

function mapStateToProps(state) {
  const CATEGORY_QUERY = state.categoryReducer;
  return {
    CATEGORY_QUERY,
  };
}

Category.propTypes = {
  CATEGORY_QUERY: PropTypes.instanceOf(Object).isRequired,
  fetchCategory: PropTypes.func.isRequired,
  categoryName: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, actionCreators)(Category);
