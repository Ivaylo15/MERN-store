import axios from 'axios';
import { messages } from '../constants/success-messages';
import { setFilters, setProduct } from '../redux/productSlice';

export const productService = {
    getProducts: (dispatch, currPage, categoryOption, sizeOption, colorOption, priceOption) => {

        const categoryString = new URLSearchParams(categoryOption);
        const categoryUrl = `&${categoryString.toString()}`;
        let sizeUrl = `&size=${sizeOption.toString()}`;
        let colorUrl = `&color=${colorOption.toString()}`;
        const priceString = new URLSearchParams(priceOption);
        let priceUrl = `&${priceString.toString()}`;

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