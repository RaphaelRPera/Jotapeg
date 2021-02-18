// import React from 'react'
import { useDispatch } from 'react-redux'
import { getUser } from '../store/User/User.actions'


export const useGetUser = () => {
    const dispatch= useDispatch()
    dispatch(getUser())
}