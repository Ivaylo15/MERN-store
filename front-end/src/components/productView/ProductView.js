import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { productService } from '../../services/productServices';

const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding: 2rem 0 2rem 0;
    width: 80%;
    min-height: 100vh;
    background-color: whitesmoke;
    margin: 0 auto 0 auto;
    img {
        width: 380px;
    }
`;

const ProductView = (props) => {
    const redirect = useHistory();
    const productId = props.location.pathname.split('/')[1];
    const [product, setProduct] = useState('');

    useEffect(() => {
        productService.getSingeProduct(productId, setProduct)
    }, [productId])

    const deleteProduct = () => {
        productService.deleteProduct(productId, redirect);
    }

    return (
        <Container>
            <div>
                <p>{product.category}</p>
                <img src={product.image} alt="product-img" />
            </div>
            <div>
                <h2>{product.title}</h2>
                <p>{product.size}</p>
                <p>{product.color}</p>
                <p>{product.price}</p>
                <button>Edit</button>
                <button onClick={deleteProduct}>Delete</button>
            </div>
        </Container>
    )
}

export default ProductView;
