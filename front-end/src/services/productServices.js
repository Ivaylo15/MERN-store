import axios from 'axios';
import { setFilters, setProduct } from '../redux/productSlice';

export const productService = {
    getProducts: (dispatch, currPage, categoryOption, sizeOption, colorOption) => {

        const categoryString = new URLSearchParams(categoryOption);
        const categoryUrl = `&${categoryString.toString()}`;
        let sizeUrl = `&size=${sizeOption.toString()}`;
        let colorUrl = `&color=${colorOption.toString()}`;

        axios.get(`//localhost:9999/products?page=${currPage}&limit=12${categoryUrl}${sizeUrl}${colorUrl}`)
            .then(res => {
                dispatch(setProduct(res.data))
            })
            .catch(err => alert(err.message));
    },
    getFilters: (dispatch) => {
        axios.get(`//localhost:9999/productsFilters`)
            .then(res => {
                dispatch(setFilters(res.data));
            })
            .catch(err => alert(err.message));
    },
    addProduct: (title, category, size, color, price, image ) => {
        axios.post(`//localhost:9999/products`, {
            title,
            category,
            size,
            color,
            price,
            image 
        })
        .then(res => {
            alert('SUCCES')
            console.log(res)
        })
        .catch(err => alert(err.message));
    }
}