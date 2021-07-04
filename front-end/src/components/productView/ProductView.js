import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { productService } from '../../services/productServices';

const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding: 2rem 0 2rem 0;
    width: 80%;
    min-height: 100vh;
    background-color: whitesmoke;
    margin: 0 auto;
    .letf__container {
        p {
            margin-bottom: 1rem;
            color: #aaa;
            font-size: 20px;
            font-weight: 500;      
        }
        img {
        width: 380px;
        }
    }
    .right__container {
        padding: 2rem;
        margin-left: -10rem;
        h2 {
            font-weight: 600;
            margin: 1rem 0;
        }
        p {
            font-size: 20px;
            font-weight: 300;
            margin-bottom: 0.6rem;
        }
        .price {
            margin-top: 5rem;
            font-size: 25px;
            font-weight:600;
        }
        div {
            button{
                margin: 2rem 1rem 0 0;
                padding: 1.5rem;
                background-color: white;
                border: none;
                border-radius: 0.5rem;
                font-size: 20px;
                cursor: pointer;
                :hover {
                    background-color: #bbb;
                    color: white;
                }
            }
        }
    }
`;

const ProductView = () => {
    const history = useHistory();
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        productService.getSingeProduct(id, setTitle, setCategory, setSize, setColor, setPrice, setImageUrl)
    }, [id])

    const deleteProduct = () => {
        productService.deleteProduct(id, title, history);
    }

    return (
        <Container>
            <div className="letf__container">
                <p>{category}</p>
                <img src={imageUrl} alt="product-img" />
            </div>
            <div className="right__container">
                <h2>{title}</h2>
                <p>size: {size}</p>
                <p>color: {color}</p>
                <p className="price">price: {price} $</p>
                <div>
                    <button onClick={() => {history.push(`/edit/${id}`)}}>Edit</button>
                    <button onClick={deleteProduct}>Delete</button>
                </div>
            </div>
        </Container>
    )
}

export default ProductView;
