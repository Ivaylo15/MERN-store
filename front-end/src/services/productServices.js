import axios from 'axios';
import { messages } from '../constants/success-messages';
import { setFilters, setProduct } from '../redux/productSlice';
import { utilFunc } from './utils';

export const productService = {
    getProducts: (dispatch, currPage, categoryOption, sizeOption, colorOption, priceOption) => {
        const categoryUrl = utilFunc.stringifyUrl('category', categoryOption);
        const sizeUrl = utilFunc.stringifyUrl('size', sizeOption);
        const colorUrl = utilFunc.stringifyUrl('color', colorOption);
        const priceUrl = utilFunc.stringifyUrl('price', priceOption);

        axios.get(`${process.env.REACT_APP_BASE_URL}products?page=${currPage}&limit=12${categoryUrl}${sizeUrl}${colorUrl}${priceUrl}`)
            .then(res => {
                dispatch(setProduct(res.data))
            })
            .catch(err => alert(err.message));
    },
    getFilters: (dispatch) => {
        axios.get(`${process.env.REACT_APP_BASE_URL}productsFilters`)
            .then(res => {
                dispatch(setFilters(res.data));
            })
            .catch(err => alert(err.message));
    },
    addProduct: (title, category, size, color, price, image) => {
        axios.post(`${process.env.REACT_APP_BASE_URL}products`, {
            title,
            category,
            size,
            color,
            price,
            image
        })
            .then(res => {
                alert(messages.success)
            })
            .catch(err => alert(err.message));
    }
}