import { useDispatch, useSelector } from "react-redux"
import { useHistory, useLocation } from 'react-router-dom'
import { goToLogin, goToMyImages } from '../router/Coordinator'
import { getUser } from '../store/User/User.actions'

export const useProtectPage = () => {
    const location = useLocation()
    const page = location.pathname
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user) || false
    if (!user) {dispatch(getUser())}
    if (!user && page !== '/login' && page !== '/signup') {
        goToLogin(history)
    } else if (user && user !== 'unauthorized' && (page === '/login' || page === '/signup')) {
        goToMyImages(history)
    }
}

