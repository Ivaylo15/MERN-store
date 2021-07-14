import styled from 'styled-components';

const Container = styled.div`
    border-bottom: 1px solid #ccc;
    padding: 2rem;
    h3{
        margin-bottom: 1rem;
    }
`;

const ProductsContainer = styled.div`
    
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
            <ProductsContainer>{products.map(product => (
                <ProductMap key={product._id}>
                    <img src={product.image} alt="product-img" />
                    <div>
                        <h4>{product.title}</h4>
                        <div>
                            <p>size: {product.size}</p>
                            <p>color: {product.color}</p>
                        </div>
                        <p className="price">{price}$</p>
                    </div>
                </ProductMap>
            ))}
            </ProductsContainer>
        </Container>
    )
}

export default DisplayOrders
