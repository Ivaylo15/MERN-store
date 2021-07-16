import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectUser } from '../../redux/userSlice';
import { orderService } from '../../services/orderServices';
import ProfileSidebar from '../user/profile/profileSidebar.js/ProfileSidebar';
import DisplayOrders from './DisplayOrders';

const Container = styled.div`
    width: 80%;
    min-height: 100vh;
    background-color: whitesmoke;
    display: flex;

    margin: 0 auto;
    h1 {
        text-align: center;
    }
    .orderContaner{
        width: 75%;
    }
`;

const UserOrders = () => {
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
            <div className="orderContaner">
                <h1>Orders</h1>
                {orders?.map(order => (
                    <DisplayOrders key={order._id} id={order._id} products={order.products} price={order.price} date={order.date || 'no date'} />
                ))}
            </div>

        </Container>
    )
}

export default UserOrders
