import styled from 'styled-components'


export const PageContainer = styled.div`
    display: grid;
    justify-items: center;
    align-content: center;
    margin-top: 20px;
`

export const Title = styled.h2`
    margin-top: 0;
`

export const AlertContainer = styled.div`
    color: ${props => props.alert.type === 'error' ? '#DD1818' : 'green'};
    transition: 0.5s;
    display: ${props => props.alert.active ? 'block' : 'none'};
    text-align: left;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
    width: 95%;
    max-width: 600px;
    min-width: 250px;
`

export const ButtonContainer = styled.div`
    margin: 20px 0 0 0;
`

