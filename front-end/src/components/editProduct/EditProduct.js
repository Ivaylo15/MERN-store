import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { productService } from '../../services/productServices';

const Container = styled.div`
    width: 80%;
    min-height: 100vh;
    background-color: whitesmoke;
    margin: 0 auto 0 auto;

    h2{
        padding: 1rem;
        text-align: center;
    }
    form{
        display: flex;
        flex-direction: column;
        width: 35%;
        margin: 0 auto 0 auto;
    }

    form input{
        margin: 1rem;
        padding: 0.8rem;
        outline: none;
        border: none;
    }

    form button {
        padding: 0.8rem;
        width: 25%;
        margin: 2rem auto 0 auto;
        cursor: pointer;
        border: none;
        background-color: white;
        border-radius: 0.5rem;

        :hover{
            background-color: #BBB;
            color: white;
        }
    }
`;

const AddProduct = (props) => {
    const redirect = useHistory();
    const productId = props.location.pathname.split('/')[2];
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        productService.getSingeProduct(productId, setTitle, setCategory, setSize, setColor, setPrice, setImageUrl)
    }, [productId])

    const editProduct = () => {
        productService.editProduct(productId, title, category, size, color, price, imageUrl)
        redirect.push('/')
    };


    return (
        <Container>
            <h2>Add Product</h2>
            <form>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title" />
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="category" />
                <input type="text" value={size} onChange={(e) => setSize(e.target.value)} placeholder="size" />
                <input type="text" value={color} onChange={(e) => setColor(e.target.value)} placeholder="color" />
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="price" />
                <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="imageUrl" />
                <button type="submit" onClick={editProduct}>Edit Product</button>
            </form>
        </Container>
    )
}

export default AddProduct;


