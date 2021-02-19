import React from 'react'
import { PageContainer } from './style'


export const Footer = () => {
    return (
        <PageContainer>
            {`©${new Date().getFullYear()} Raphael Ribeiro`}
        </PageContainer>
    )
}
