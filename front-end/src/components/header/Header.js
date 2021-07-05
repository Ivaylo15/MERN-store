import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/userSlice';
import { userServices } from '../../services/userServices';

const Container = styled.div`
    background-color: whitesmoke;
    height: 4rem;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
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

const LinkStyle = styled.div`
    margin: 10px;
    text-decoration: none;
    color: black;
    :hover {
        color: red;
    }
`

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const signOut = () => {
        userServices.logout(dispatch);
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
            </LeftContainer>
        </Container >
    )
}

export default Header;


