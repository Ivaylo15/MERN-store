import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: '',
        filters: '',
    },
    reducers: {
        setProduct: (state, action) => {
            state.products = action.payload;
        },
        setFilters: (state, action) => {
            state.filters = action.payload;
        }
    },
});

export const { setProduct, setFilters } = productSlice.actions;

export const selectProduct = state => state.product.products;
export const selectFilters = state => state.product.filters;

export default productSlice.reducer;
