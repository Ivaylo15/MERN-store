import styled from 'styled-components';


const Filter = ({ addFilterOptions, title, filterOptions }) => {

    return (
        <Container>
            <Title onClick={(() => addFilterOptions(title.toLowerCase(), null))}>{title}</Title>
            <div>
                {filterOptions?.map(item => (
                    <Link key={item} onClick={(() => addFilterOptions(title.toLowerCase(), item))}>{item}</Link>
                ))}
            </div>
        </Container>
    )
}

export default Filter;

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
