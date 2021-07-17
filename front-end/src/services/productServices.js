import axios from 'axios';
import { constants } from '../constants/constants';
import { setFilters, setProduct } from '../redux/productSlice';

export const productService = {
    getProducts: (dispatch, currPage, searchUrl, categoryUrl, sizeUrl, colorUrl, priceUrl) => {
        axios.get(`${process.env.REACT_APP_BASE_URL}products?page=${currPage}&limit=${constants.productCount}${searchUrl}${categoryUrl}${sizeUrl}${colorUrl}${priceUrl}`)
            .then(res => {
                dispatch(setProduct(res.data))
            })
            .catch(err => alert(err.message));
    },
    getSingelProduct: (productId, setTitle, setCategory, setSize, setColor, setPrice, setImageUrl) => {
        axios.get(`${process.env.REACT_APP_BASE_URL}products/${productId}`)
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
        axios.get(`${process.env.REACT_APP_BASE_URL}products/filters`)
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
                alert(`${title} was added`);
            })
            .catch(err => alert(err.message));
    },
    editProduct: (id, title, category, size, color, price, image) => {
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
                alert(`${title} was edited`);
            })
            .catch(err => alert(err.message));
    },
    deleteProduct: (productId, title, history) => {
        axios.delete(`${process.env.REACT_APP_BASE_URL}products/${productId}`)
            .then(res => {
                alert(`${title} was deleted`);
                history.push('/');
            })
            .catch(err => alert(err.message));
    }
}