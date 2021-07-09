import { useEffect, useState } from "react";
import styled from 'styled-components';
import Filter from "../filter/Filter";
import Product from '../product/Product';
import DisplayFilters from '../filter/DisplayFilters';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { productService } from "../../services/productServices";
import { useDispatch, useSelector } from "react-redux";
import { selectFilters, selectProduct } from "../../redux/productSlice";
import { utilFunc } from "../../services/utils";
import { constants } from "../../constants/constants";

const Container = styled.div`
    width: 80%;
    min-height: 100vh;
    background-color: whitesmoke;
    margin: 0 auto;
    display: flex;

    a {
        text-decoration: none;
        color: black;
    }
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
    height: 6vh;
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

const SortButtons = styled.div`
    margin-left: auto;
    padding: 0.5rem;
        button {
        padding: 0.5rem;
        background-color: white;
        border-radius: 0.5rem;
        border: none;
        margin: 0.5rem;
        cursor: pointer;
        :hover{
            background-color: #bbb;
            color: white;
        }
    }
`;

const Products = styled.div`
    min-height: 70vh;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
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

const Gallery = () => {
    const dispatch = useDispatch();
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const history = useHistory();
    const products = useSelector(selectProduct);
    const filters = useSelector(selectFilters);
    const [currPage, setCurrPage] = useState(1);
    const [categoryOption, setCategoryOption] = useState('');
    const [sizeOption, setSizeOption] = useState([]);
    const [colorOption, setColorOption] = useState([]);
    const [priceOption, setPriceOption] = useState('');

    useEffect(() => {
        if (searchParams.get(constants.filterCategory)) {
            setCategoryOption(searchParams.get(constants.filterCategory))
        }
        if (searchParams.get(constants.filterSize)) {
            setSizeOption((sizeOption) => [...sizeOption, ...searchParams.get(constants.filterSize).split(',')]);
        }
        if (searchParams.get(constants.filterColor)) {
            setColorOption((colorOption) => [...colorOption, ...searchParams.get(constants.filterColor).split(',')]);
        }
        if (searchParams.get(constants.filterPrice)) {
            setPriceOption(searchParams.get(constants.filterPrice))
        }
    }, [])

    useEffect(() => {
        let categoryUrl = '';
        let sizeUrl = '';
        let colorUrl = '';
        let priceUrl = '';
        if (categoryOption) {
            categoryUrl = utilFunc.stringifyUrl(constants.filterCategory, categoryOption);
        }
        if (sizeOption.length > 0) {
            sizeUrl = utilFunc.stringifyUrl(constants.filterSize, sizeOption);
        }
        if (colorOption.length > 0) {
            colorUrl = utilFunc.stringifyUrl(constants.filterColor, colorOption);
        }
        if (priceOption) {
            priceUrl = utilFunc.stringifyUrl(constants.filterPrice, priceOption);
        }

        history.push({
            pathname: '/',
            search: `?${categoryUrl}${sizeUrl}${colorUrl}${priceUrl}`
        })
        productService.getProducts(dispatch, currPage, categoryOption, sizeOption, colorOption, priceOption);
    }, [dispatch, history, currPage, categoryOption, sizeOption, colorOption, priceOption]);

    useEffect(() => {
        productService.getFilters(dispatch);
    }, [dispatch]);

    const removeCategory = () => {
        setCategoryOption('')
    }

    const removePrice = () => {
        setPriceOption('')
    }

    const removeFilter = (filterType, value) => {
        if (filterType === constants.filterSize) {
            const newArray = sizeOption.filter(size => size !== value)
            setSizeOption(newArray)
        } else if (filterType === constants.filterColor) {
            const newArray = colorOption.filter(color => color !== value)
            setColorOption(newArray)
        }
    }

    const addFilterOptions = (filterType, value) => {
        if (filterType === constants.filterCategory) {
            if (value) {
                setCategoryOption(value)
            } else {
                setCategoryOption('')
            }
        } else if (filterType === constants.filterSize) {
            if (!sizeOption.includes(value)) {
                setSizeOption((sizeOption) => [...sizeOption, value]);
            }
        } else if (filterType === constants.filterColor) {
            if (!colorOption.includes(value)) {
                setColorOption((colorOption) => [...colorOption, value]);
            }
        } else if (filterType === constants.filterPrice) {
            setPriceOption(value)
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
                    <p onClick={removeCategory}>{categoryOption}</p>
                    <DisplayFilters removeFilter={removeFilter} filterType={constants.filterSize} options={sizeOption} />
                    <DisplayFilters removeFilter={removeFilter} filterType={constants.filterColor} options={colorOption} />
                    <SortButtons>
                        <p onClick={removePrice}>Sort by price</p>
                        <button onClick={() => addFilterOptions(constants.filterPrice, 'desc')}>Lower</button>
                        <button onClick={() => addFilterOptions(constants.filterPrice, 'asc')}>Higher</button>
                    </SortButtons>
                </ChosenOptions>
                <Products>
                    {
                        products?.results?.map(({ _id, title, category, size, color, price, image }) => (
                            <Link to={`/${_id}`}>
                                <Product key={_id} title={title} category={category} size={size} color={color} price={price} image={image} />
                            </Link>
                        ))
                    }
                </Products>
                <Pagination>
                    {products?.previous && (<Button onClick={(() => setCurrPage(currPage - 1))}>Previous</Button>)}
                    <div>
                        {Array(products?.pageCount).fill().map((_, index) => (
                            <PagButton onClick={(() => setCurrPage(index + 1))} currPage={currPage} index={index + 1} key={index}>{index + 1}</PagButton>
                        ))}
                    </div>
                    {products.pageCount > currPage && (<Button onClick={(() => setCurrPage(currPage + 1))}>NEXT</Button>)}
                </Pagination>
            </ProductContainer>
        </Container>
    )
}

export default Gallery;


