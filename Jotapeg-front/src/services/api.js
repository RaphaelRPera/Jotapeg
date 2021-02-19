import axios from 'axios'

export const baseUrl = 'http://ec2-54-227-230-170.compute-1.amazonaws.com:3003'

export default axios.create({
    baseURL: baseUrl
})