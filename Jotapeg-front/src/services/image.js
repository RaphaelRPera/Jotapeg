import axios from 'axios'

const baseUrl = 'http://localhost:3003'


export const addImage = async (body) => {
    const token = localStorage.getItem('token')
    const config = {headers: {Authorization: token}}
    try {
        return await axios.post(`${baseUrl}/image`, body, config)
        .then(response => {
            const result = {status: response.status, message: response.data.message}
            return result
        })
        .catch(error => {
            const result = {status: error.response.status, message: error.response.data.message}
            return result
        })
    } catch (error) {
        return false
    }
}


export const getImageAll = async () => {
    const token = localStorage.getItem('token')
    const config = {headers: {Authorization: token}}
    try {
        return await axios.get(`${baseUrl}/image/all`, config)
            .then(response => {
                const result = {status: response.status, data: response.data}
                return result
            })
            .catch(error => {
                const result = {status: error.response.status, message: error.response.data.message || error}
                return result
            })
    } catch (error) {
        return error
    }
}