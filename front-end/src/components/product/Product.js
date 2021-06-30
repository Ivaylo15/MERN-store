import styled from 'styled-components';


const Product = ({ id, title, category, size, color, price, image }) => {
    const checkImage = image || 'https://assets.adidas.com/images/w_600,f_auto,q_auto/0a4e5e0b39f34d69a88cab730101f847_9366/Manchester_United_20-21_Home_Youth_Kit_Red_FM4288.jpg';
    return (
        <Container>
            <Image loading='lazy' src={checkImage} alt="product" />
            <div>
                <Category>{category}</Category>
                <Title>{title}</Title>
                <Price>{price} $</Price>
            </div>
        </Container>
    )
}

export default Product;

const Container = styled.div`
    margin: 1rem;
    padding: 2rem 0 1rem 0;
    position: relative;
    cursor: pointer;
    transition: transform 200ms ease-in;
    :hover{
        z-index: 100;
        transform: scale(1.10);
    }
`;

const Image = styled.img`
    width: 250px;
`;

const Category = styled.p`
    position: absolute;
    top: 0;
    right: 0;
    padding-right: 0.5rem;
    color: #BBB;
`;

const Title = styled.h3`
    margin-top: 1rem;
    font-size: medium;
    font-weight: 400;
`;

const Price = styled.p`
    margin-top: 0.3rem;
    font-size: large;
    font-weight: bold;
`;

