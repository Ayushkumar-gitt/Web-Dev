import React, { createContext, useEffect, useState } from 'react'
import { getAllProducts } from "../api/ProductApi";

export const allProductsContext = createContext()

const ProductContext = ({ children }) => {
    const [allProducts, setallProducts] = useState([])

    async function getProducts() {
        const data = await getAllProducts()
        setallProducts(data)
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <allProductsContext.Provider value={allProducts}>
            <div>
                {children}
            </div>
        </allProductsContext.Provider>
    )
}

export default ProductContext
