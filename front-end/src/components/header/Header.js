import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
        </Container>
    )
}

export default Header;


