import axios from "axios";
import { useEffect, useState } from "react";
import styled from 'styled-components';
import Product from '../product/Product';


const Gallery = () => {
    const [products, setProducts] = useState('');
    const [currPage, setCurrPage] = useState(1);

    useEffect(() => {
        axios.get(`//localhost:9999/products?page=${currPage}&limit=12`, {
            params: {
                test: 'test'
            }
        })
            .then(res => {
                setProducts(res.data)
            })
            .catch(err => console.log(err));
    }, [currPage]);

    console.log(products)

    return (
        <Container>
            <FilterContainer>
                filter
            </FilterContainer>
            <ProductContainer>
                <Products>
                    {
                        products?.results?.map(({ _id, title, category, size, color, price, image }) => (
                            <Product key={_id} id={_id} title={title} category={category} size={size} color={color} price={price} image={image} />
                        ))
                    }
                </Products>
                <Pagination>
                    {products?.previous && (<Button onClick={(() => setCurrPage(currPage - 1))}>pppp</Button>)}
                    <div className="flex">
                        {Array(products?.pageCount).fill().map((_, i) => (
                            <PagButton onClick={(() => setCurrPage(i + 1))} currPage={currPage} index={i + 1} key={i}>{i + 1}</PagButton>
                        ))}
                    </div>
                    {products?.next && (<Button onClick={(() => setCurrPage(currPage + 1))}>NEXT</Button>)}
                </Pagination>
            </ProductContainer>
        </Container>
    )
}

export default Gallery;

const Container = styled.div`
    width: 80%;
    min-height: 100vh;
    background-color: whitesmoke;
    margin: 0 auto 0 auto;
    display: flex;
`;

const FilterContainer = styled.div`
    width: 20%;
`;

const ProductContainer = styled.div`
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Products = styled.div`
    height: 80%;
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
`;

const Pagination = styled.div`
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
`;

const Button = styled.button`
    padding: 0.8rem;
    cursor: pointer;
    border: 1px solid #CCC;
`;

const PagButton = styled.button`
    padding: 0.8rem;
    cursor: pointer;
    background-color: ${prop => prop.currPage === prop.index ? "gray" : "white"};
    border: 1px solid #CCC;
`;
