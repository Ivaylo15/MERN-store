import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { userServices } from '../../services/userServices';

const Container = styled.div`
    width: 80%;
    min-height: 100vh;
    background-color: whitesmoke;
    margin: auto;

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
        padding: 1rem;
        outline: none;
        border: none;
    }
    form p {
        margin: 2rem auto 0 auto;
        font-size: 20px;
    }
    form button {
        padding: 1rem;
        width: 30%;
        margin: 2rem auto 0 auto;
        cursor: pointer;
        border: none;
        background-color: white;
        border-radius: 0.5rem;
        font-weight: 600;

        :hover{
            background-color: #BBB;
            color: white;
        }
    }
`;

const LoginPage = () => {
    const dispatch = useDispatch();
    const [cookies] = useCookies();
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const signUp = (e) => {
        e.preventDefault();
        userServices.register(username, password);
    }

    const signIn = (e) => {
        e.preventDefault();
        userServices.login(dispatch, username, password, history, cookies);
    }

    return (
        <Container>
            <form>
                <h2>Join Us</h2>
                <input type="text" placeholder="name" value={username} onChange={e => setUsername(e.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit" onClick={signIn}>Sign In</button>
                <p>If you have not registration</p>
                <button type="submit" onClick={signUp}>Sign Up</button>
            </form>
        </Container>
    )
}

export default LoginPage;
