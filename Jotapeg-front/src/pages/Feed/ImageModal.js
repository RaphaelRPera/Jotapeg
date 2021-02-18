import React, { useState } from 'react'
import { PageContainer, ModalContainer, CloseButton, Img, SideArrow, SidePanel } from './styleModal'


export const ImageModal = (props) => {
    const [index, setIndex] = useState(props.index)
    const imagesBd = props.imagesBd
    const image = imagesBd[index]

    const subtitle = image.subtitle

    const newDate = new Date(image.date)
    const date = `${newDate.getDate()}-${newDate.getMonth() + 1}-${newDate.getFullYear()}`

    const collection = image.collection

    return (
        <PageContainer>
            <SideArrow onClick={() => {index > 0 && setIndex(index - 1)}} active={index > 0}> {'<'} </SideArrow>
            <ModalContainer>
                <Img src={image.file} />
                <CloseButton onClick={() => props.setModal({open: false, index})} > x </CloseButton>
                <SidePanel>
                    <div>{subtitle}</div>
                    <div>
                        <div>{date}</div>
                        <div>{collection}</div>
                    </div>
                </SidePanel>
            </ModalContainer>
            <SideArrow onClick={() => {index < imagesBd.length - 1 && setIndex(index + 1)}}  active={index < imagesBd.length - 1} > {'>'} </SideArrow>

        </PageContainer>
    )
}
