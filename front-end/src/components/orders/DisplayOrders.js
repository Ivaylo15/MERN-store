import styled from 'styled-components';

const Container = styled.div`
    border-bottom: 1px solid #ccc;
    padding: 2rem;
    h3{
        margin-bottom: 1rem;
    }
`;

const OrderInfo = styled.div`
    display: flex;
    justify-content: space-between;

    .totalPrice{
        font-size: 30px;
        font-weight: bold;
        margin-right: 2rem;
        background-color: orange;
        padding: 2rem;
        border-radius: 1rem;
    }
`;

const ProductMap = styled.div`
    display: flex;
    padding: 2rem;
    img{
        width: 200px;
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
            font-size: 30px;
            font-weight: 500;
        }
    }
`;

const DisplayOrders = ({ id, products, price }) => {
    return (
        <Container>
            <h3>Order: {id}</h3>
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
                            <p className="price">{product.price}$</p>
                        </div>
                    </ProductMap>
                ))}
                </div>
                <div>
                    <p className="totalPrice">Total Price: {price}$</p>
                </div>
            </OrderInfo>
        </Container>
    )
}

export default DisplayOrders
