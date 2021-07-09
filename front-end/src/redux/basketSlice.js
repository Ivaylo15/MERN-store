import { createSlice } from '@reduxjs/toolkit';

export const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        products: []
    },
    reducers: {
        setInitialBasket: (state, action) => {
            state.products = [...state.products, ...action.payload]
            console.warn(
                `${action.payload}`
            )
        },
        addToBasket: (state, action) => {
            state.products = [...state.products, action.payload]
        },
        emptyBasket: (state, action) => {
            state.products = []
        },
        removeFromBasket: (state, action) => {
            const index = state.products.findIndex(basketProduct => basketProduct._id === action.payload.id);

            let newBasket = [...state.products];
            if (index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.warn(
                    `Cant remove product (id:${action.payload.id} not in the basket)`
                )
            }

            state.products = newBasket;
        },
    },
});

export const { setInitialBasket, addToBasket, emptyBasket, removeFromBasket } = basketSlice.actions;

export const selectBasketProducts = (state) => state.basket.products;
export const selectTotal = (state) => state.basket.products.reduce((total, item) => total + item.price, 0);
// export const selectProductsIds = (state) => state.basket.products.map((product => product._id))

export default basketSlice.reducer;