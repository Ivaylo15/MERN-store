import { useState } from 'react';
import styled from 'styled-components';
import { productService } from '../../services/productServices';

const Container = styled.div`
    width: 80%;
    min-height: 100vh;
    background-color: whitesmoke;
    margin: 0 auto;

    h2{
        padding: 1rem;
        text-align: center;
    }
    form{
        display: flex;
        flex-direction: column;
        width: 35%;
        margin: 0 auto;
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

const AddProduct = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const addProduct = () => {
        productService.addProduct(title?.target?.value, category?.target?.value, size?.target?.value, color?.target?.value, price?.target?.value, imageUrl?.target?.value)
    };

    return (
        <Container>
            <h2>Add Product</h2>
            <form>
                <input type="text" value={title?.target?.value} onChange={setTitle} placeholder="title" />
                <input type="text" value={category?.target?.value} onChange={setCategory} placeholder="category" />
                <input type="text" value={size?.target?.value} onChange={setSize} placeholder="size" />
                <input type="text" value={color?.target?.value} onChange={setColor} placeholder="color" />
                <input type="number" value={price?.target?.value} onChange={setPrice} placeholder="price" />
                <input type="text" value={imageUrl?.target?.value} onChange={setImageUrl} placeholder="imageUrl" />
                <button type="submit" onClick={addProduct}>Add Product</button>
            </form>
        </Container>
    )
}

export default AddProduct;


