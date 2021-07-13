import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import basketReducer from './basketSlice';
import userReducer from './userSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    basket: basketReducer,
  },
});