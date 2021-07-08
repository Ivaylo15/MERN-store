import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectUser } from '../../redux/userSlice';
import Currency from "react-currency-formatter";
import { selectBasketProducts, selectTotal } from '../../redux/basketSlice';
import CheckoutProduct from './CheckoutProduct';

const Container = styled.div`
    display: flex;
    width: 80%;
    min-height: 100vh;
    background-color: whitesmoke;
    margin: 0 auto;
`;

const LeftContainer = styled.div`
    width: 70%;
    border-right: 2px solid white;
    .productInfo{
        display: flex;
        justify-content: space-evenly;
        margin: 2rem 0;
        img{
            width: 35%;
            width: 250px;
        }
        div{
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
        }
    }
`;

const RightContainer = styled.div`
    width: 20%;
    padding: 3rem;
`;



const Checkout = () => {
    const user = useSelector(selectUser);
    const basketProducts = useSelector(selectBasketProducts);
    const total = useSelector(selectTotal);

    return (
        <Container>
            <LeftContainer>
                {basketProducts?.map((product) => (
                    <CheckoutProduct key={product._id} id={product._id} title={product.title} category={product.category} size={product.size} color={product.color} price={product.price} image={product.image}/>
                ))}
            </LeftContainer>
            <RightContainer>
                {basketProducts.length && (
                    <>
                        <h2>Subtotal ({user.basket.length} items): {' '}</h2>
                        <span>
                            <Currency quantity={total} currency="USD" />
                        </span>
                    </>
                )}
            </RightContainer>
        </Container>
    )
}

export default Checkout