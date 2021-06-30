import axios from "axios";
import { useEffect, useState } from "react";
import styled from 'styled-components';
import Filter from "../filter/Filter";
import Product from '../product/Product';
import DisplayFilters from '../filter/DisplayFilters';


const Gallery = () => {
    const [filters, setFilters] = useState('');
    const [products, setProducts] = useState('');
    const [currPage, setCurrPage] = useState(1);
    const [categoryOption, setCategoryOption] = useState({});
    const [sizeOption, setSizeOption] = useState([]);
    const [colorOption, setColorOption] = useState([]);

    useEffect(() => {
        const categoryString = new URLSearchParams(categoryOption);
        const categoryUrl = `&${categoryString.toString()}`;
        let sizeString = `&size=${sizeOption.toString()}`;
        let colorString = `&color=${colorOption.toString()}`;

        axios.get(`//localhost:9999/products?page=${currPage}&limit=12${categoryUrl}${sizeString}${colorString}`)
            .then(res => {
                setProducts(res.data)
            })
            .catch(err => console.log(err));
    }, [currPage, categoryOption, sizeOption, colorOption]);

    useEffect(() => {
        axios.get(`//localhost:9999/productsFilters`)
            .then(res => {
                setFilters(res.data)
            })
            .catch(err => console.log(err));
    }, [categoryOption]);

    const removeCategory = () => {
        setCategoryOption({})
    }

    const removeFilter = (filterType, value) => {
        if (filterType === 'size') {
            const newArray = sizeOption.filter(i => i !== value)

            setSizeOption(newArray)
        } else if (filterType === 'color') {
            const newArray = colorOption.filter(i => i !== value)

            setColorOption(newArray)
        }
    }

    const addFilterOptions = (filterType, value) => {
        const filter = {};
        if (filterType === 'category') {
            if (value) {
                filter[filterType] = value;
                setCategoryOption(filter)
            } else {
                setCategoryOption({})
            }
        } else if (filterType === 'size') {
            if (!sizeOption.includes(value)) {
                setSizeOption((sizeOption) => [...sizeOption, value]);
            }
        } else if (filterType === 'color') {
            if (!colorOption.includes(value)) {
                setColorOption((colorOption) => [...colorOption, value]);
            }
        }
    }

    return (
        <Container>
            <FilterContainer>
                <Filter addFilterOptions={addFilterOptions} title='Category' filterOptions={filters?.category} />
                <Filter addFilterOptions={addFilterOptions} title='Size' filterOptions={filters?.size} />
                <Filter addFilterOptions={addFilterOptions} title='Color' filterOptions={filters?.color} />
            </FilterContainer>
            <ProductContainer>
                <ChosenOptions>
                    <p onClick={removeCategory}>{categoryOption.category}</p>
                    <DisplayFilters removeFilter={removeFilter} type='size' options={sizeOption} />
                    <DisplayFilters removeFilter={removeFilter} type='color' options={colorOption} />
                </ChosenOptions>
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
    padding: 1rem;
`;

const ProductContainer = styled.div`
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const ChosenOptions = styled.div`
    border-bottom: 1px solid #ccc;
    height: 1vh;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 1rem;
    margin-right: 1rem;
    cursor: pointer;
    p{
        margin-left: 1rem;
    }

    p:hover {
        color: red;
    }
`;

const Products = styled.div`
    min-height: 70vh;
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
