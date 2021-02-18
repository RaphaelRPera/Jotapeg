import api from '../../services/api'
import { createAction } from '@reduxjs/toolkit'

export const setImages = createAction('SET_IMAGES')

export const getImages = () => {
    console.log('Images.actions: getImages')
    const token = localStorage.getItem('token')
    const config = {headers: {Authorization: token}}
    return dispatch => {
        api.get(`/image/all`, config)
            .then(response => dispatch(setImages(response.data)))
            .catch(error => dispatch(setImages(false)))
    }
}
