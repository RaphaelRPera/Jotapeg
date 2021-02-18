import axios from 'axios'
import { goToMyImages } from '../router/Coordinator'
import { setNickname } from '../store/Nickname/Nickname.actions'
import { setUser } from '../store/User/User.actions'


const baseUrl = 'http://localhost:3003'


export const signUp = (body, setError, dispatch, nickname, history) => {
    axios.post(`${baseUrl}/user/signup`, body)
        .then(response => {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('nickname', nickname)
            dispatch(setNickname(nickname))
            // goToFeed(history)
            goToMyImages(history)
        })
        .catch(error => {
            let errorMsg = 'Erro ao cadastrar! Revise os dados informados e tente novamente.'
            switch (error.response.data.message || error) {
                case 'User already registered':
                    errorMsg = `* usuário já possui cadastro!`; break
                default: break
            }
            setError(errorMsg)
        })
}

export const login = async (body, setError, dispatch, history) => {
    // const dispatch = useDispatch()
    axios.post(`${baseUrl}/user/login`, body)
        .then(response => {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('nickname', response.data.nickname)
            // setNickname(response.data.nickname)
            // dispatch(setNickname(response.data.nickname))
            dispatch(setUser(0))
            // goToFeed(history)
            goToMyImages(history)
        })
        .catch(error => {
            setError('* Usuário ou senha incorretos!')
        })
}


export const validateUser = async (token) => {
    const config = {headers: {Authorization: token}}
    return await axios.get(`${baseUrl}/user/validate`, config)
        .then(response => {
            // console.log('validateUser:', response.data)
            // return true
            return response.data
        })
        .catch(error => { return false })
}

