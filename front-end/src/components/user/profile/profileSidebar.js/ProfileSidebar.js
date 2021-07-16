import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { userServices } from '../../../../services/userServices';

const SidebarContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 20%;
    border-right: 1px solid #ccc;
    text-align: center;
    a{
        padding: 0.5rem;
        font-size: 22px;
        font-weight: 600;
        text-decoration: none;
        color: black;
        :hover {
            color: red;
        }
    }
    p{
        padding: 0.5rem;
        font-size: 22px;
        font-weight: 600;
        cursor: pointer;
        :hover {
            color: red;
        }
    }
`;

const ProfileSidebar = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const signOut = () => {
        userServices.logout(dispatch, history);
    }

    return (
        <SidebarContainer>
            <Link to="/profile">
                Profile
            </Link>
            <Link to="/addresBook">
                Addres Book
            </Link>
            <Link to="/orders">
                Orders
            </Link>
            <p onClick={signOut}>Exit</p>
        </SidebarContainer>
    )
}

export default ProfileSidebar;
