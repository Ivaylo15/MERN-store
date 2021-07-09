import styled from 'styled-components';
import Currency from "react-currency-formatter";
import { useDispatch, useSelector } from 'react-redux';
import { removeFromBasket, selectProductsIds } from '../../redux/basketSlice';
import { userServices } from '../../services/userServices';
import { selectUser } from '../../redux/userSlice';

const Container = styled.div`
    width: 65%;
    padding: 2rem;
    h3{
        margin-bottom: 2rem;
    }
    p{
        margin-bottom: 1rem;
    }
    .price{
        margin-top: 4rem;
        font-weight: 600;
        font-size: 30px;
    }
    button{
        padding: 1rem;
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
`;

const CheckoutProduct = ({ id, image, title, size, color, price }) => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const productsIds = useSelector(selectProductsIds);

    const removeProduct = () => {
        dispatch(removeFromBasket({ id }));
        productsIds.splice(productsIds.indexOf(id), 1);
        if(!!user){
            userServices.removeFromBasket(user._id, productsIds);
        }
    }

    return (
        <Container className="productInfo">
            <img src={image} alt="product-img" />
            <div>
                <h3>{title}</h3>
                <p>size: {size}</p>
                <p>color: {color}</p>
                <p className="price">
                    <Currency quantity={price} currency="USD" />
                </p>
                <button onClick={removeProduct}>Remove</button>
            </div>
        </Container>
    )
}

export default CheckoutProduct
