import React from 'react'
// import { Loading } from '../../components/Loading/Loading'
import { useProtectPage } from '../../hooks/useProtectPage'
import { CollecContainer } from './CollecContainer'
import { PageContainer } from './style'


export const Collections = () => {
    useProtectPage()
    return (
        <PageContainer>
            {/* {conteudo ? <CollecContainer/> : <Loading/>} */}
            <CollecContainer/>
        </PageContainer>
    )
}