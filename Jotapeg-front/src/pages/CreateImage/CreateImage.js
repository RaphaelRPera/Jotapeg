import React, { useEffect, useState } from 'react'
import { CreateImageForm } from './CreateImageForm'
import { PageContainer, Title } from './style'
// import { useHistory } from 'react-router-dom'
// import { protectPage } from '../../hooks/protectPage'
import { useProtectPage } from '../../hooks/useProtectPage'

export const CreateImage = () => {
    // const [protect, setProtect] = useState(false)
    // const history = useHistory()

    // const verifyProtect = () => {
    //     protectPage('createimage', history) .then(() => { setProtect(true) })
    // }

    // useEffect(() => {
    //     verifyProtect()
    // }, [])

    useProtectPage()

    return (
        <>
            {/* {protect &&
                <PageContainer>
                    <Title>Adicionar imagem</Title>
                    <CreateImageForm/>
                </PageContainer>
            } */}

            <PageContainer>
                <Title>Adicionar imagem</Title>
                <CreateImageForm/>
            </PageContainer>

        </>
    )
}
