import React from 'react'
import { useProtectPage } from '../../hooks/useProtectPage'
import { ImageContainer } from './ImageContainer'
import { PageContainer} from './style'


export const MyImages = () => {
    useProtectPage()
    return (
        <PageContainer>
            <ImageContainer/>
        </PageContainer>
    )
}
