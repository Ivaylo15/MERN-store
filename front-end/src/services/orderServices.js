import axios from 'axios';

export const orderService = {
    ordersForUser: (userId, setOrders) => {
        axios.get(`${process.env.REACT_APP_BASE_URL}order/${userId}`)
            .then(res => (
                setOrders(res.data)
            ))
            .catch(err => alert(err.message))
    },
    createOrder: (userId, orderItems, price) => {
        axios.post(`${process.env.REACT_APP_BASE_URL}order`, {
            userId,
            orderItems,
            price
        })
            .then(res => alert('Order Made'))
            .catch(err => alert(err.message))
    }
}