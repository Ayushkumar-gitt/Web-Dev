import { createProduct, viewAllProduct, viewProducts } from "../services/product.api.js";
import { useDispatch } from 'react-redux'
import { setAllProducts, setSellerProducts } from '../state/product.slice.js'

export function useProduct() {
    const dispatch = useDispatch()

    // Creates a new product by sending form data to the server
    async function handleCreateProduct(formdata) {
        const response = await createProduct(formdata)
        return response.product
    }

    // Fetches all products belonging to the current seller
    async function handleGetProduct() {
        const response = await viewProducts()
        dispatch(setSellerProducts(response.products))
        return response.products
    }

    async function handleGetAllProducts() {
        const response = await viewAllProduct()
        dispatch(setAllProducts(response.productData))
    }

    return { handleCreateProduct, handleGetProduct, handleGetAllProducts }
}
