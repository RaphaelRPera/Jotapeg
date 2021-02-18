import React, { useState } from 'react'
import { CardContainer, CardHover, ImgContainer } from './styleCard'


export const ImageCard = (props) => {
    const imgUrl = props.image.file
    const [isHover, setIsHover] = useState(false)

    return (
        <CardContainer onMouseOver={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            <ImgContainer imgUrl={imgUrl}>
                {isHover && <CardHover onClick={() => props.setModal({open: true, index: props.index})} > {props.image.subtitle} </CardHover>}
            </ImgContainer>
        </CardContainer>
    )
}