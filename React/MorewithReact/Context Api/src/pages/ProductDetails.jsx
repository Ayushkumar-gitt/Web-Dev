import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { allProductsContext } from '../context/ProductContext'

const ProductDetails = () => {    
  let {productId} = useParams()

  let productData = useContext(allProductsContext)

  let selectedProduct = ''
  if(productData.length>0){
  selectedProduct = productData.find((elem) => elem.id == productId)
  console.log(selectedProduct);
  }
  
  return (
    <div className='productCard'>
          <img src={selectedProduct.image} alt="" />
          <h4>{selectedProduct.title}</h4>
          <h4>Price : ${selectedProduct.price}</h4>
      {/* <h4>Location - {props.itemDetails.location}</h4> */}
    </div>
  )
}

export default ProductDetails
