import axios from 'axios';
import { constants } from '../constants/constants';
import { messages } from '../constants/success-messages';
import { setFilters, setProduct } from '../redux/productSlice';
import { utilFunc } from './utils';

export const productService = {
    getProducts: (dispatch, currPage, categoryOption, sizeOption, colorOption, priceOption) => {
        const categoryUrl = utilFunc.stringifyUrl('category', categoryOption);
        const sizeUrl = utilFunc.stringifyUrl('size', sizeOption);
        const colorUrl = utilFunc.stringifyUrl('color', colorOption);
        const priceUrl = utilFunc.stringifyUrl('price', priceOption);

        axios.get(`${process.env.REACT_APP_BASE_URL}products?page=${currPage}&limit=${constants.productCount}${categoryUrl}${sizeUrl}${colorUrl}${priceUrl}`)
            .then(res => {
                dispatch(setProduct(res.data))
            })
            .catch(err => alert(err.message));
    },
    getSingeProduct: (productId, setTitle, setCategory, setSize, setColor, setPrice, setImageUrl) => {
        axios.get(`${process.env.REACT_APP_BASE_URL}product/${productId}`)
            .then(res => {
                setTitle(res.data.title);
                setCategory(res.data.category);
                setSize(res.data.size);
                setColor(res.data.color);
                setPrice(res.data.price);
                setImageUrl(res.data.image);
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
    },
    editProduct: (id, title, category, size, color, price, image, redirect) => {
        axios.put(`${process.env.REACT_APP_BASE_URL}products`, {
            id,
            title,
            category,
            size,
            color,
            price,
            image
        })
            .then(res => {
                alert(messages.success);
            })
            .catch(err => alert(err.message));
    },
    deleteProduct: (productId, redirect) => {
        axios.delete(`${process.env.REACT_APP_BASE_URL}products/${productId}`)
            .then(res => {
                alert(productId + 'deleted')
            })
            .catch(err => alert(err.message));
    }
}