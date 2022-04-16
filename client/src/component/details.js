import React from 'react';
import { useParams } from 'react-router-dom';

class Details extends React.Component {
    render () {
        const {data, id, symbol} = this.props
        let idParam = useParams()
        const currentCategory = data.categories.products.filter(({id}) => id === )
        return(
            <p>test</p>
        )
    }
}

export default Details