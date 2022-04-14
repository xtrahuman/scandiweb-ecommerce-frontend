import React from 'react';

class Category extends React.Component {

    render() {
       const {data, categoryName} = this.props
       const currentCategory = data.categories.filter(({name}) => name === categoryName)
        return (
            <div>
            {currentCategory.map(({name, products}) => (
            <div key={name}>
            <h1>{name}</h1>
             <div className='d-flex row'>
             {products.map(({id,gallery})=>
             <div className='d-flex card' style={{}} key={id}>
             <div className='d-flex card-container'>
             <div className='img-container'><img src={gallery[0]} style={{width: '100%', height: '350px', objectFit:'contain'}} alt={id}/></div>
             <p className='card-name'>{id}</p>
             <p className='card-name'>{id}</p>
             </div>
             </div>
             )}
             </div>
            </div>
            ))}
            </div>
        )
    }
}

export default Category