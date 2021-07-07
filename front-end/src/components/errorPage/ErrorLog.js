import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
    width: 80%;
    min-height: 100vh;
    background-color: whitesmoke;
    margin: 0 auto;
    text-align: center;
    padding: 5rem;
`;

const ErrorLog = () => {
    return (
        <Container>
            <h2>You are already SIGNED !</h2>
            <Link to="/">
                <h4>Go to home page</h4>
            </Link>
        </Container>
    )
}

export default ErrorLog
