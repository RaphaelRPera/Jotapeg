// import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useLocation } from 'react-router-dom'
import { goToLogin, goToMyImages } from '../router/Coordinator'
import { getUser } from '../store/User/User.actions'

export const useProtectPage = () => {
    const location = useLocation()
    const page = location.pathname
    // console.log(`useProtectPage (${page})`)
    const history = useHistory()
    const dispatch = useDispatch()
    // dispatch(getUser())
    const user = useSelector(state => state.user) || false
    // console.log('useProtectPage', user.nickname, page)
    if (!user) {dispatch(getUser())}
    if (!user && page !== '/login' && page !== '/signup') {
        goToLogin(history)
    } else if (user && (page === '/login' || page === '/signup')) {
        goToMyImages(history)
    }
}

