// import axios from "axios";
import api from '../../services/api'
import { createAction } from '@reduxjs/toolkit'

// const baseUrl = 'http://localhost:3003'

// export async function getUser (other) {
//     // const token = localStorage.getItem('token')
//     // const config = {headers: {Authorization: token}}
//     // const user = await axios.get(`${baseUrl}/user/validate`, config)
//     //     .then(response => {
//     //         console.log('getUser: user:', response.data)
//     //         return response.data
//     //     })
//     //     .catch(error => console.log('getUser: error:', error))

//     // console.log('getUser2: user:', user)
//     console.log('getUser2: other:', other)

//     return {
//         type: 'GETUSER',
//         payload: other
//     }
// }



// export function setUser (name) {
//     return {
//         type: 'SETUSER',
//         payload: name
//     }
// }

export const setUser = createAction('SETUSER')


// export const getUser = createAction('GETUSER')



export const getUser = (body) => {
    // console.log('User.actions: getUser')
    const token = localStorage.getItem('token')
    const config = {headers: {Authorization: token}}
    return dispatch => {
        api.get(`/user/validate`, config)
            .then(response => dispatch(setUser(response.data)))
            // .catch(error => dispatch(setUser('Unauthorized!')))
            .catch(error => dispatch(setUser(false)))
    }
}

export const userLogin = (body) => {
    return dispatch => {
        api.post('user/login', body)
            .then(response => {
                // console.log('userLogin:', response.data)
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('nickname', response.data.nickname)
                dispatch(setUser(response.data))
            })
            // .catch(error => {dispatch(setUser('Unauthorized!'))})
            .catch(error => {dispatch(setUser(false))})
    }
}


// export const login = async (body, setError, dispatch, history) => {
//     // const dispatch = useDispatch()
//     axios.post(`${baseUrl}/user/login`, body)
//         .then(response => {
//             localStorage.setItem('token', response.data.token)
//             localStorage.setItem('nickname', response.data.nickname)
//             // setNickname(response.data.nickname)
//             // dispatch(setNickname(response.data.nickname))
//             dispatch(setUser(0))
//             // goToFeed(history)
//             goToMyImages(history)
//         })
//         .catch(error => {
//             setError('* Usuário ou senha incorretos!')
//         })
// }
