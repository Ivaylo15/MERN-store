import moment from 'moment';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { selectUser } from '../../../redux/userSlice';
import { orderService } from '../../../services/orderServices';
import ProfileSidebar from './profileSidebar.js/ProfileSidebar';

const Container = styled.div`
    width: 80%;
    min-height: 100vh;
    display: flex;
    background-color: whitesmoke;
    margin: auto;

    .profileContainer{
        width: 75%;
        padding: 4rem;
        h2{
            font-size: 30px;
            font-weight: 700;
            margin-bottom: 2rem;
        }
        p{
            font-size: 20px;
            font-weight: 400;
            margin-bottom: 0.5rem;
        }
        .orders{
            width: 100%;
            div{
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 1rem;

                h4{
                    font-size: 20px;
                    font-weight: 600;
                }
                a{
                    color: black;
                    font-size: 20px;
                    font-weight: 400;
                    :hover{
                        color: red;
                    }
                }
            }
            table {
                border-collapse: collapse;
                width: 100%;
            }
            td, th {
                border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;
            }

            tr:nth-child(even) {
                background-color: #dddddd;
                }
            }
        }
`;

const Profile = () => {
    const user = useSelector(selectUser);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user?._id) {
            orderService.ordersForUser(user._id, setOrders)
        }
    }, [user])

    return (
        <Container>
            <ProfileSidebar />
            <div className="profileContainer">
                <h2>General Info</h2>
                <p>Hi, {user?.username}</p>
                <div className="orders">
                    <div>
                        <h4>Last Orders:</h4>
                        <Link to="/orders">More Info...</Link>
                    </div>
                    <table>
                        <tr>
                            <th>Order Id</th>
                            <th>Date</th>
                            <th>Order by</th>
                            <th>Price</th>
                        </tr>
                        {orders?.map(order => (
                            <tr key={order._id}>
                                <th>{order._id}</th>
                                <th>{moment(order.date).format('MMMM Do YYYY, h:mm:ss a')}</th>
                                <th>{user?.username}</th>
                                <th>${order.price}</th>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </Container>
    )
}

export default Profile;
