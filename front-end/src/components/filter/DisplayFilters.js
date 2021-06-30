import styled from 'styled-components';


const DisplayFilters = ({ removeFilter, type, options }) => {
    return (
        <Container>
            {options?.map((item, i) => (
                <p key={i} onClick={(() => removeFilter(type, item))}>{item}</p>
            ))}
        </Container>
    )
}

export default DisplayFilters;

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
