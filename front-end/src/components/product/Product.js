import styled from 'styled-components';
import PropTypes from 'prop-types';

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


const Product = ({ id, title, category, size, color, price, image }) => {
    return (
        <Container>
            <Image loading='lazy' src={image} alt="product" />
            <div>
                <Category>{category}</Category>
                <Title>{title}</Title>
                <Price>{price} $</Price>
            </div>
        </Container>
    )
}

Product.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    category: PropTypes.string,
    size: PropTypes.string,
    color: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
}

export default Product;



