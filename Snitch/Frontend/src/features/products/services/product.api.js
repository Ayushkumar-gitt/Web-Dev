import axios from 'axios';

const api = axios.create({
    baseUrl: "http://localhost:3000/products",
    withCredentials: true,
})

async function createProduct(formdata) {
    const response = await api.post('/seller/create', formdata)
    return response.data
}

async function viewProducts() {
    const response = await api.get('/seller/view')
    return response.data
}

export { createProduct, viewProducts }