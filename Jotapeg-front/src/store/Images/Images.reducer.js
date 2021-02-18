import { createReducer } from '@reduxjs/toolkit'

export default createReducer(false, {
    'SET_IMAGES': (state, action) => action.payload
})