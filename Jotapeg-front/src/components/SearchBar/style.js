import styled from 'styled-components'

export const SearchContainer = styled.div`
    display: grid;
    grid-template-columns: 45px 1fr 45px;
    align-content: stretch;
    width: 100%;
    max-width: 905px;
    min-width: 270px;
    margin-bottom: calc(15px + 1.5vh);
    border-bottom: 1px solid rgba(200,200,200,0.9);
    box-shadow: 0 1px 2px rgba(240,240,240,0.8);
`

export const SearchIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 5px;
    cursor: pointer;
    transition: 0.1s;
    :active{
        background-color: rgba(220,220,220,0.8);
    };
    margin: 2px;
    border-radius: 3px;
`

export const Img = styled.img`
    /* background-color: lightcoral; */
    width: 80%;
`

export const SearchInput = styled.input`
    width: 100%;
    /* max-width: 910px; */
    max-width: 905px;
    min-width: 270px;
    padding: 10px 5px;
    border: none;
    outline: 0;
    background-color: #FAFAFA;
    :focus {
        border: none;
        outline: 0;
    };
    /* font-size: calc(12px + 1vh); */
    font-size: calc(14px + 0.4vw);
    ::placeholder{
        color: rgba(130,130,130,1);
        font-size: calc(12px + 0.5vw);
    };
`


export const SearchClean = styled.div`
    /* background-color: lightcoral; */
    display: grid;
    place-items: center;
    font-size: calc(14px + 0.4vw);
    color: rgba(50,50,50,1);
    cursor: pointer;
    user-select: none;
`

//  SearchIcon
//  Img
//  SearchBar (mudar para SearchInput)
//  SearchClean