import React from 'react'
import { useHistory } from 'react-router-dom'
import { LoginForm } from './LoginForm'
import { PageContainer, Title } from './style'
import { useSelector} from 'react-redux'
import { Loading } from '../../components/Loading/Loading'
import { useProtectPage } from '../../hooks/useProtectPage'


export const Login = () => {
    const history = useHistory()
    useProtectPage()
    const user = useSelector(state => state.user)

    return (
        <>
            {user === false || user === 'unauthorized' ?
                <PageContainer>
                    <Title>Login</Title>
                    <LoginForm/>
                </PageContainer>
             :
                <Loading/>
            }
        </>
    )
}
