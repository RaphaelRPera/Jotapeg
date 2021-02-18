import React from 'react'
import { SignUpForm } from './SignUpForm'
import { PageContainer, Title } from './style'
import { useProtectPage } from '../../hooks/useProtectPage'


export const SignUp = () => {
    useProtectPage()
    return (
        <PageContainer>
            <Title>Cadastre-se!</Title>
            <SignUpForm/>
        </PageContainer>
    )
}
