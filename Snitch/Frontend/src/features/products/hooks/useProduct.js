import { createProduct, viewProducts } from "../services/product.api";
import { useDispatch } from 'react-redux'
import { setSellerProducts } from '../state/product.slice.js'

export function useProduct() {
    const dispatch = useDispatch()
    export async function handleCreateProduct(formdata) {
        const response = await createProduct(formdata)
        return response.product
    }

    export async function handleGetProduct() {
        const response = await viewProducts()
        dispatch(setSellerProducts(response.products))
        return response.products
    }

    return { handleCreateProduct, handleGetProduct }
}