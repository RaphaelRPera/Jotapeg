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
    @media screen and (min-width: 571px) {grid-template-columns: auto 25%;};
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
    /* background-color: #FAFAFA; */
    background-color: whitesmoke;
    font-size: calc(12px + 0.4vw);
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    word-wrap: break-word;
`

export const SideHeader = styled.div`
    /* background-color: lightgreen; */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid rgba(200,200,200,0.9);
    box-shadow: 0 1px 2px rgba(240,240,240,0.8);

    @media screen and (min-width: 571px) {flex-direction: column};
    @media screen and (min-width: 710px) {flex-direction: row};
`

export const SideUser = styled.div`
    /* background-color: lightcoral; */
    margin-bottom: 5px;

    @media screen and (min-width: 710px) {margin-bottom: 0px};
`

export const SideDate = styled.div`
    /* background-color: lightcoral; */
    font-size: calc(12px);
    color: rgba(130,130,130,1);
`

export const SideMiddleContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex-grow: 2;
`

export const SideSubtitle = styled.div`
    /* background-color: lightcoral; */
    padding: 10px 10px 0 10px;
    text-align: left;
`

export const SideTagContainer = styled.div`
    /* background-color: lightcoral; */
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px 10px 10px;
`

export const SideTag = styled.div`
    /* background-color: rgba(220,220,220,0.8); */
    background-color: lightblue;
    font-size: 12px;
    /* color: rgba(80,80,80,1); */
    color: rgba(50,50,50,1);
    /* color: whitesmoke; */
    padding: 2px 6px;
    margin: 4px 4px 0 0;
    border-radius: 3px;
    text-align: center;
`

export const SideCollection = styled.div`
    text-align: left;
    padding: 10px;
    border-top: 1px solid rgba(200,200,200,0.9);
`


