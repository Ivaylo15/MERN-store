import styled from 'styled-components';
import moment from 'moment';

const Container = styled.div`
    border-bottom: 1px solid #ccc;
    padding: 2rem;
   
    .header{
        display: flex;
        align-items:center;
        justify-content: space-between;
        h3{
            margin-bottom: 1rem;
        }
        .date{
            font-size: 14px;
            font-weight: 600;  
        }
    } 
`;

const OrderInfo = styled.div`
    display: flex;
    justify-content: space-between;

    .totalPrice{
        margin-top: 2rem;
        height: 35px;
        font-size: 25px;
        font-weight: bold;
        background-color: orange;
        padding: 1.5rem;
        border-radius: 1rem;
    }
`;

const ProductMap = styled.div`
    display: flex;
    padding: 1rem;
    img{
        width: 150px;
        margin-right: 2rem;
    }
    div{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        h4{
            font-size: 25px;
            font-weight: 400;
        }
        div {
            font-size: 16px;
            font-weight: 500;
        }
        .price{
            font-size: 25px;
            font-weight: 500;
        }
    }
    
    
`;

const DisplayOrders = ({ id, products, price, date }) => {
    const formatDate = moment(date).format('MMMM Do YYYY, h:mm:ss a')
    return (
        <Container>
            <div className="header">
                <h3>Order: {id}</h3>
                <p className="date">Created on: {formatDate}</p>
            </div>
            <OrderInfo>
                <div>{products.map(product => (
                    <ProductMap key={product._id}>
                        <img src={product.image} alt="product-img" />
                        <div>
                            <h4>{product.title}</h4>
                            <div>
                                <p>size: {product.size}</p>
                                <p>color: {product.color}</p>
                            </div>
                            <p className="price">${product.price}</p>
                        </div>
                    </ProductMap>
                ))}
                </div>
                <p className="totalPrice">Total Price: ${price}</p>
            </OrderInfo>
        </Container>
    )
}

export default DisplayOrders
