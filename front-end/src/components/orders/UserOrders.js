import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectUser } from '../../redux/userSlice';
import { orderService } from '../../services/orderServices';
import DisplayOrders from './DisplayOrders';

const Container = styled.div`
    width: 80%;
    min-height: 100vh;
    background-color: whitesmoke;
    margin: 0 auto;
    h1 {
        text-align: center;
    }
`;

const UserOrders = () => {
    const user = useSelector(selectUser);
    const [orders, setOrders] = useState([]);

    console.log(orders)
    useEffect(() => {
        if (user?._id) {
            orderService.ordersForUser(user._id, setOrders)
        }
    }, [user])

    return (
        <Container>
            <h1>Orders</h1>
            {orders?.map(order => (
                <DisplayOrders key={order._id} id={order._id} products={order.products} price={order.price} />
            ))}
        </Container>
    )
}

export default UserOrders
