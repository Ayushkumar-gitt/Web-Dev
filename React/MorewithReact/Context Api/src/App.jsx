import React, { useContext } from 'react'
import { allProductsContext } from './context/ProductContext'
import ProductDetails from './pages/ProductDetails';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';

const App = () => {
  return (
    <div>
       <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:productId' element={<ProductDetails />} />
      </Routes>
    </div>
  )
}

export default App
