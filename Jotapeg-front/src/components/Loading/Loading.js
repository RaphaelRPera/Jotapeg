import React from  'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { PageContainer } from './style'


export const Loading = () => {
    return (
        <PageContainer>
            <CircularProgress/>
        </PageContainer>
    )
}