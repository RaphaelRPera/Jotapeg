import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Footer } from '../components/Footer/Footer'
import { MainAppBar } from '../components/MainAppBar/MainAppBar'
import { Router } from '../router/Router'
import { useGetUser } from '../hooks/useGetUser'
import { MainPageContainer } from './style'


export const AppContainer = () => {
    useGetUser()
    return (
        <BrowserRouter>
            <MainAppBar/>

            <MainPageContainer>
                <Router/>
            </MainPageContainer>

            <Footer/>
        </BrowserRouter>
    )
}
