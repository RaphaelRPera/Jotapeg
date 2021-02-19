import api from '../../services/api'
import { createAction } from '@reduxjs/toolkit'


export const setUser = createAction('SETUSER')

export const getUser = (body) => {
    const token = localStorage.getItem('token')
    const config = {headers: {Authorization: token}}
    return dispatch => {
        api.get(`/user/validate`, config)
            .then(response => dispatch(setUser(response.data)))
            .catch(error => dispatch(setUser(false)))
    }
}

export const userLogin = (body) => {
    return dispatch => {
        dispatch(setUser(false))
        api.post('/user/login', body)
            .then(response => {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('nickname', response.data.nickname)
                dispatch(setUser(response.data))
            })
            .catch(error => {
                console.log('userLogin: error:', error)
                const errorMsg = error.response.data.message
                if (errorMsg === 'Invalid email or password') {
                    dispatch(setUser('unauthorized'))
                } else if (errorMsg === 'User not found') {
                    dispatch(setUser('unauthorized'))
                } else {
                    dispatch(setUser(false))
                }
            })
    }
}
