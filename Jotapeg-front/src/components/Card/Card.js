import React, { useState } from 'react'
import { CardContainer, CardHover, ImgContainer } from './style'


export const Card = (props) => {
    const image = props.image
    const imgUrl = image.file
    const hoverText = props.hoverText
    const cardClick = props.cardClick
    const index = props.index
    const [isHover, setIsHover] = useState(false)
    // console.log('Card: isHover:', isHover)


    return (
        <CardContainer onMouseOver={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            <ImgContainer imgUrl={imgUrl}>
                {/* {isHover && <CardHover onClick={() => props.setModal(props.index)} > {props.image.subtitle} </CardHover>} */}
                {/* {isHover && <CardHover onClick={() => props.setModal(props.index)} > {props.collection} </CardHover>} */}
                {isHover && <CardHover onClick={() => cardClick(index)} > {hoverText} </CardHover>}
            </ImgContainer>
        </CardContainer>
    )
}