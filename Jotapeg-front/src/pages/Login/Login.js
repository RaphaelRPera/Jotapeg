import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { protectPage } from '../../hooks/protectPage'
import { LoginForm } from './LoginForm'
import { PageContainer, Title } from './style'
import { useDispatch, useSelector} from 'react-redux'
import { getUser } from '../../store/User/User.actions'
import { Loading } from '../../components/Loading/Loading'
import { goToMyImages } from '../../router/Coordinator'
import { useGetUser } from '../../hooks/useGetUser'
import { useProtectPage } from '../../hooks/useProtectPage'


export const Login = () => {
    const history = useHistory()

    // console.log('Login')
    useProtectPage()

    // const verifyProtect = () => {
    //     protectPage('login', history).then(() => { setProtect(true) })
    // }
    // useGetUser()
    // const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    // console.log('Login: user:', user)

    if (user) {goToMyImages(history)}

    // useEffect(() => {
    //     // verifyProtect()
    //     // dispatch(getUser())
    //     setTimeout(()  => {
    //         // dispatch(getUser())
            
    //     }, 2000)
    // }, [])

    return (
        <>
            {/* {protect &&
                <PageContainer>
                    <Title>Login</Title>
                    <LoginForm/>
                </PageContainer>
            } */}
            {user === false ?
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
