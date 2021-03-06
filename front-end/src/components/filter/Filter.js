import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
    margin: 1rem;
    background-color: white;
    padding: 1rem;
    border-radius: 0.5rem;
`;

const Title = styled.h3`
    font-size: 1.3rem;
    font-weight: 600;
    cursor: pointer;
`;

const Link = styled.p`
    padding: 0.2rem 0 0 0.5rem;
    color: #888;
    cursor: pointer;

    :hover {
        color: #000;
    }
`;

const Filter = ({ addFilterOptions, title, filterOptions }) => {
    return (
        <Container>
            <Title onClick={(() => addFilterOptions(title.toLowerCase(), null))}>{title}</Title>
            <div>
                {filterOptions?.map(option => (
                    <Link key={option} onClick={(() => addFilterOptions(title.toLowerCase(), option))}>{option}</Link>
                ))}
            </div>
        </Container>
    )
}

Filter.propTypes = {
    addFilterOptions: PropTypes.func.isRequired,
    title: PropTypes.string,
    filter: PropTypes.array
}

export default Filter;

