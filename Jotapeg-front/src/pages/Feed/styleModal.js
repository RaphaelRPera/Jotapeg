import styled from 'styled-components'


export const PageContainer = styled.div`
    background-color: rgba(0,0,0,0.95);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    display: grid;
    grid-template-columns: auto 1fr auto ;
    justify-items: center;
    align-content: center;
    column-gap: 1px;
    overflow:auto;
`


export const ModalContainer = styled.div`
    background-color: lightcoral;
    width: 100%;
    display: grid;
    grid-template-columns: auto;
    @media screen and (min-width: 400px) {grid-template-columns: auto 25%;};
    max-width: 900px;
    max-height: 99vh;
`
 

export const CloseButton = styled.span`
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    padding: 7px 25px;
    color: white;
    font-size: 30px;
    user-select: none;
`


export const Img = styled.img`
    width: 100%;
`


export const SideArrow = styled.div`
    align-self: center;
    cursor: ${props => props.active ? 'pointer' : 'auto'};
    padding: 7px 15px;
    color: ${props => props.active ? 'white' : 'black'};
    font-size: calc(12px + 1.6vw);
    user-select: none;
`


export const SidePanel = styled.div`
    background-color: #FAFAFA;
    font-size: calc(12px + 0.4vw);
    background-color: whitesmoke;
    padding: 10px 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    word-wrap: break-word;
`

