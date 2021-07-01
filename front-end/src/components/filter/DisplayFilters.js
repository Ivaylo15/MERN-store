import styled from 'styled-components';
import PropTypes from 'prop-types';


const Container = styled.div`
    height: 1vh;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    p{
        margin-left: 1rem;
    }

    p:hover {
        color: red;
    }
`;



const DisplayFilters = ({ removeFilter, filterType, options }) => {
    return (
        <Container>
            {options?.map((item, index) => (
                <p key={index} onClick={(() => removeFilter(filterType, item))}>{item}</p>
            ))}
        </Container>
    )
}

DisplayFilters.propTypes = {
    removeFilter: PropTypes.func,
    filterType: PropTypes.string,
    options: PropTypes.array
}

export default DisplayFilters;

