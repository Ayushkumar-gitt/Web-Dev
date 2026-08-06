import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
    name: "Products",
    initialState: {
        sellerProducts: []
    },
    reducers: {
        setSellerProducts: (state, action) => {
            state.sellerProducts = action.payload
        }
    }
})

export const { productSlice } = productSlice.actions

export default productSlice.reducer