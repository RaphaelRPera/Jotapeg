import { configureStore } from '@reduxjs/toolkit'
// import { createStore, combineReducers } from 'redux'
import nicknameReducer from './Nickname/Nickname.reducer'
import searchBarReducer from './SearchBar/SearchBar.reducer'
import userReducer from './User/User.reducer'
import imagesReducer from './Images/Images.reducer'


// const rootReducer = combineReducers({
//     nickname: nicknameReducer,
//     searchBar: searchBarReducer,
//     user: userReducer,
// })

// const store = createStore(rootReducer)


const store = configureStore({
    reducer: {
        nickname: nicknameReducer,
        searchBar: searchBarReducer,
        user: userReducer,
        images: imagesReducer,
    }
})

export default store