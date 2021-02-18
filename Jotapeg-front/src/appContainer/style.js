import styled from 'styled-components'

export const MainPageContainer = styled.main`
    /* background-color: lightblue; */
    background-color: #FAFAFA;
    min-height: 100vh;
    /* min-height: calc(100vh - 55px - 60px); */
    min-height: calc(100vh - 50px);
    box-sizing: border-box;
    display: grid;
    /* place-items: center; */
    justify-content:stretch;
    padding: 55px 5px 20px 5px;
    @media screen and (min-width: 736px) {padding: 55px 20px 20px 20px;};
    /* align-content: center; */
    /* position: relative; */
`