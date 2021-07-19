import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: '',
        filters: '',
        search: '',
    },
    reducers: {
        setProduct: (state, action) => {
            state.products = action.payload;
        },
        setFilters: (state, action) => {
            state.filters = action.payload;
        },
        setSearchItem: (state, action) => {
            state.search = action.payload;
        }
    },
});

export const { setProduct, setFilters, setSearchItem } = productSlice.actions;

export const selectProduct = state => state.product.products;
export const selectFilters = state => state.product.filters;
export const selectSearch = state => state.product.search;

export default productSlice.reducer;
