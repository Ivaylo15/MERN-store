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
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const basket = useSelector(selectBasketProducts);

    const signOut = () => {
        userServices.logout(dispatch, history);
    }

    return (
        <Container>
            <LeftContainer>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <LinkStyle>
                        Gallery
                    </LinkStyle>
                </Link>
                <Link to="/add" style={{ textDecoration: 'none' }}>
                    <LinkStyle>
                        Add Product
                    </LinkStyle>
                </Link>
            </LeftContainer>
            <RightContainer>
                {user?.username ?
                    (
                        <p onClick={signOut}>{user.username}</p>
                    ) : (
                        <Link to="/signIn" style={{ textDecoration: 'none' }}>
                            <LinkStyle>
                                SignIn
                            </LinkStyle>
                        </Link>
                    )
                }
                <Link to="/checkout" style={{ textDecoration: 'none' }}>
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


