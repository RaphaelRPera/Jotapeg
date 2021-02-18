import styled from 'styled-components'

export const PageContainer = styled.div`
    width: 100%;
    max-width: 910px;
    min-width: 270px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`


export const ModalOpen = styled.div`
    cursor: pointer;
    padding: 3px 6px;
    background-color: lightblue;
`

export const FilterButton = styled.div`
    background-color: lightblue;
    font-size: 16px;
    /* color: rgba(50,50,50,1); */
    padding: 0px 4px 0px 8px;
    margin: 4px 4px 15px 0;
    border-radius: 10px;
    text-align: center;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;
`

export const FilterText = styled.span`
    margin-right: 5px;
`

export const FilterClose = styled.div`
    /* background-color: lightcoral; */
    cursor: pointer;
    padding: 5px;
    font-weight: bold;
`