// import { goToFeed, goToLogin, goToMyImages } from '../router/Coordinator'
// import { validateUser } from '../services/user'


// export const protectPage = async (page, history) => {
//     const token = localStorage.getItem('token')
//     await validateUser(token).then(response => {
//         // console.log('protectpage: validateUser: response:', response)
//         if (page !== 'login' && page !== 'signup' && !response) {
//             // console.log(`[protectPage]: ${response} - goToLogin`)
//             goToLogin(history)
//         } else if ((page === 'login' || page === 'signup') && response) {
//             // console.log(`[protectPage]: ${response} - goToMyImages`)
//             // goToFeed(history)
//             goToMyImages(history)
//         } else {
//             // console.log(`[protectPage]: ${response}`)
//         }
//         // console.log(`[protectPage]: [${page}]: DONE!`)
//     })
// }
