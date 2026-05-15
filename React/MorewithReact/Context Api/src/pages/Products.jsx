import React, { useContext } from 'react'
import { allProductsContext } from '../context/ProductContext';
import { Link } from 'react-router-dom';

const Products = () => {
    const data = useContext(allProductsContext)
    
    let renderdata = <h2>Loading products...</h2>
    if (data.length > 0) {
        renderdata = <div className='prodContainer'>
            {data.map(function (elem) {
                return <Link key={elem.id} to={`/products/${elem.id}`}>
                    <div className='productCard'>
                        <img src={elem.image}/>
                        <h4>{elem.title}</h4>
                        <h4>Price : ${elem.price}</h4>
                    </div>
                </Link>
            })}
        </div>
    }
    return (
        <div>
            {renderdata}
        </div>
    )
}

export default Products
