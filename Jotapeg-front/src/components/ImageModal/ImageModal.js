import React, { useState } from 'react'
import { PageContainer, ModalContainer, CloseButton, Img, SideArrow, SidePanel, SideHeader, SideUser, SideDate, SideSubtitle, SideTagContainer, SideTag, SideCollection, SideMiddleContainer } from './style'


export const ImageModal = (props) => {
    const [index, setIndex] = useState(props.index)
    const images = props.images
    const image = images[index]

    const user = image.nickname

    const imageDate = new Date(image.date)
    const year = imageDate.getFullYear()
    const month = (imageDate.getMonth() + 1) > 9 ? imageDate.getMonth() + 1 : `0${imageDate.getMonth() + 1}`
    const day = imageDate.getDate() > 9 ? imageDate.getDate() : `0${imageDate.getDate()}`
    const sideDate = `${day}-${month}-${year}`

    const subtitle = image.subtitle
    const tags = image.tags
    // const tags = ['tag1', 'tag2', 'tag3']
    const collection = image.collection

    // console.log('ImageModal')
    // console.log(index, user, sideDate, subtitle, tags, collection)
    // console.log(image)

    const sideTags = 
        tags.map(tag => <SideTag> {tag} </SideTag>)

    const sidePanel = 
        <SidePanel>
            <SideHeader>
                <SideUser> {user} </SideUser>
                <SideDate> {sideDate} </SideDate>
            </SideHeader>

            <SideMiddleContainer>
                <SideSubtitle> {subtitle} </SideSubtitle>

                <SideTagContainer>
                    {sideTags}
                </SideTagContainer>
            </SideMiddleContainer>

            <SideCollection> {collection} </SideCollection>
        </SidePanel>


    return (
        <PageContainer>
            <SideArrow onClick={() => {index > 0 && setIndex(index - 1)}} active={index > 0}> {'<'} </SideArrow>

            <ModalContainer>
                <Img src={image.file} />
                {/* <CloseButton onClick={() => props.setModal({open: false, index})} > x </CloseButton> */}
                <CloseButton onClick={() => props.setModal(null)} > x </CloseButton>
                {sidePanel}
            </ModalContainer>

            <SideArrow onClick={() => {index < images.length - 1 && setIndex(index + 1)}}  active={index < images.length - 1} > {'>'} </SideArrow>
        </PageContainer>
    )
}
