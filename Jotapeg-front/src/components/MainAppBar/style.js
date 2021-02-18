import styled from 'styled-components'


export const PageContainer = styled.header`
    background-color: rgba(255,255,255,1);
    border-bottom: 1px solid rgba(200,200,200,0.4);
    box-shadow: 0 1px 4px rgba(230,230,230, 0.3);
    height: 58px;
    padding: 2px 5px;
    @media screen and (min-width: 736px) {padding: 0 20px;};
    display: grid;
    align-content: center;
    justify-items: center;
    grid-template-columns: 1fr;
    position: fixed;
    width: 100%;
    z-index:9;
`

export const MainContainer = styled.div`
    /* background-color: lightsalmon; */
    display: flex;
    justify-content: space-between;
    align-items: stretch;

    width: 100%;
    max-width: 910px;
    min-width: 270px;

    max-height: 55px;
`

export const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
    font-family: 'Pacifico', cursive;
    /* font-family: 'Orbitron', sans-serif; */
    font-weight: 700;
    font-size: 16px;
    @media screen and (min-width: 500px) {font-size: 18px};
`

export const LogoFirstLetter = styled.span`
    font-size: 26px;
    @media screen and (min-width: 500px) {font-size: 28px};
`


export const MenuContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: stretch;

    padding-right: 10px;
    padding: 2px 10px 2px 0;
    max-height: 100%;
`

export const ButtonContainer = styled.div`
    border-radius: 5px;
    cursor: pointer;
    user-select: none;

    transition: 0.1s;
    :hover {
        background-color: rgba(75,75,75,1);
        color: rgba(255,255,255,1);
    };

    :active {
        background-color: rgba(75,75,75,1);
        color: rgba(255,255,255,1);
    };

    padding: 3px 5px;
    margin-left: calc(2px + 0.5vw);
    display: grid;
    grid-template-rows: 100%;
    max-width: 42px;

    @media screen and (min-width: 500px) {
        padding: 3px 6px;
        margin-left: 2.5vw;
        display: grid;
        grid-template-rows: 55% 1fr;
        max-width: none;
    }
`

export const ButtonIcon = styled.div`
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Img = styled.img`
    max-width: 100%;
    @media screen and (min-width: 500px) {
        max-width: none;
        max-height: 100%;
    }
`

export const Avatar = styled.img`
    max-width: 100%;
    @media screen and (min-width: 500px) {
        max-width: none;
        max-height: 100%;
    }
`

export const ButtonText = styled.div`
    display: none;
    @media screen and (min-width: 500px) {display: block}
`

