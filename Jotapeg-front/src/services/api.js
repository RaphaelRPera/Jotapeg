import axios from 'axios'

export const url = 'http://localhost:3003'
// export const baseUrl = 'ec2-54-227-230-170.compute-1.amazonaws.com'

export default axios.create({
    baseURL: url
})