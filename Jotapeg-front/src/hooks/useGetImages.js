import { useDispatch } from "react-redux"
import { getImages } from '../store/Images/Images.actions'


export const useGetImages = () => {
    const dispatch = useDispatch()
    dispatch(getImages())
}