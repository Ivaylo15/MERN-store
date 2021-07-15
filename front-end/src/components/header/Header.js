import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/userSlice';
import { userServices } from '../../services/userServices';
import { ShoppingCartIcon } from '@heroicons/react/outline';
import { selectBasketProducts } from '../../redux/basketSlice';

const Container = styled.div`
    background-color: whitesmoke;
    height: 4rem;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    font-weight: 600;
    a{
        text-decoration: none;
    }
`
const LeftContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: 2rem;
   
    p{
        cursor: pointer;
        :hover {
            color: red;
        }
    }
`

const RightContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;

    p{
        cursor: pointer;
        :hover {
            color: red;
        }
    }
    .basket{
        height: 2.5rem;
        margin-left: 0.5rem;
    }
    span{
        position: absolute;
        top: 0;
        right: 0;
        width: 1.5rem;
        height: 1.5rem;
        background-color: #2AA;
        text-align: center;
        border-radius: 100%;
        color: black;
        font-weight: bold;
    }
`;

const LinkStyle = styled.div`
    margin: 10px;
    text-decoration: none;
    color: black;

    :hover {
        color: red;
    }
`

const Header = () => {
    const user = useSelector(selectUser);
    const basket = useSelector(selectBasketProducts);
    const history = useHistory();
    const dispatch = useDispatch();

    const signOut = () => {
        userServices.logout(dispatch, history);
    }

    return (
        <Container>
            <LeftContainer>
                <Link to="/">
                    <LinkStyle>
                        Gallery
                    </LinkStyle>
                </Link>
                <Link to="/add">
                    <LinkStyle>
                        Add Product
                    </LinkStyle>
                </Link>
            </LeftContainer>
            <RightContainer>
                {user?.username ?
                    (
                        <>
                            <Link to="/orders">
                                <LinkStyle>
                                    Orders
                                </LinkStyle>
                            </Link>
                            <p onClick={signOut}>{user.username}</p>
                        </>
                    ) : (
                        <Link to="/signIn">
                            <LinkStyle>
                                SignIn
                            </LinkStyle>
                        </Link>
                    )
                }
                <Link to="/checkout">
                    <LinkStyle>
                        <span>{basket.length}</span>
                        <ShoppingCartIcon className="basket" />
                    </LinkStyle>
                </Link>
            </RightContainer>
        </Container >
    )
}

export default Header;


