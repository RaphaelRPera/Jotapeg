import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
// import { protectPage } from '../../hooks/protectPage'
import { getImageAll } from '../../services/image'
import { ImageCard } from './ImageCard'
import { ImageModal } from './ImageModal'
import { NoImage } from './NoImage'
import { ImagesContainer, PageContainer } from './styleContainer'
import { SearchBar } from '../../components/SearchBar/SearchBar'
import { useSelector } from 'react-redux'
import { Loading } from '../../components/Loading/Loading'
import { removeAcento } from '../../hooks/RemoveAcento'


export const ImageContainer = () => {
    const history = useHistory()

    const [imagesBd, setImagesBd] = useState(false)
    const [modal, setModal] = useState({open:false, index: undefined})
    const [imageOrder, setImageOrder] = useState('desc')
    const searchText = useSelector(state => state.searchBar)


    const getImages = async () => {
        // console.log('getting images...')
        await getImageAll()
            .then(response => {           
                console.log(response.status)   
                switch (response.status) {
                    case 200: /*console.log('getImages:', response.data);*/ response.data.length ? setImagesBd(response.data) : setImagesBd(null); break;
                    // case 401: console.log(`[ImageContainer]: 401 Acesso não autorizado`); protectPage('myImages', history) ;break;
                    case 401: console.log(`[ImageContainer]: 401 Acesso não autorizado`); break;
                    case 400: console.log(`[ImageContainer]: 400 Acesso não autorizado`); break;
                    // case 404: console.log(`[ImageContainer]: 404 Nenhuma imagem`); setImagesBd(null); break;
                    case 404: console.log(`[ImageContainer]: 404 Nenhuma imagem`); setImagesBd(null); break;
                    default: console.log(`[ImageContainer]: [response]:`, response); break;
                }
                // console.log('getting images... DONE!')
            })
    }


    // let images = []
    let images
    let imageList = []
    if (imagesBd) {
        for (let i = 0; i < imagesBd.length; i++) {
            const image = imagesBd[i]
            const imageId = image.id
            const listIndex = imageList.indexOf(imageId)
            if (listIndex < 0) {
                imageList.push(imageId)
                const newImage = {...image, date: new Date(image.date), tags: [image.tag]}
                delete newImage.tag
                // images.push(newImage)
                images = [...images, newImage]
            } else {
                images[listIndex].tags.push(image.tag)
            }
        }
    }
    
    // if (images.length) {
    if (images) {
        if (imageOrder === 'desc') {
            images.sort((a, b) => {
                return a.date > b.date ? -1 : a.date < b.date ? 1 : 0
            })
        } else if (imageOrder === 'asc') {
            images.sort((a, b) => {
                return a.date < b.date ? -1 : a.date > b.date ? 1 : 0
            })
        }
    }


    // const cards = images.length && images.map((image, index) => {
    const cards = images && images.map((image, index) => {
        const collection = removeAcento(image.collection.toLowerCase())
        const subtitle = removeAcento(image.subtitle.toLowerCase())
        const tags = image.tags
        const search = searchText ? removeAcento(searchText) : ''

        if (search.length > 2) {
            if (collection.includes(search) || subtitle.includes(search)) {
                return <ImageCard key={index} image={image} index={index} setModal={setModal}/>
            }

            for (let i = 0; i < tags.length; i++) {
                const tag = tags[i]
                if (tag.includes(search)) {
                    return <ImageCard key={index} image={image} index={index} setModal={setModal}/>
                }
            }
        } else {
            return <ImageCard key={index} image={image} index={index} setModal={setModal}/>
        }
    })


    const searchBar = <SearchBar placeholder='título, coleção, tag...' />

    useEffect(() => {
        setTimeout(()  => {
            getImages()
        }, 1000)
    })
    
    // console.log('ImageContainer: [imagesBd]:' , imagesBd)
    // if (!imagesBd) {console.log('ImageContainer: [imagesBd]:' , imagesBd)}
    return (
        <PageContainer>
            {/* {imagesBd === null && <NoImage/>} */}
            {/* {!imagesBd.length && <NoImage/>} */}
            {/* {imagesBd === undefined && <Loading/>} */}
            {/* {!imagesBd && <Loading/>} */}
            {/* {imagesBd === false && <Loading/>} */}
            {imagesBd === false ? <Loading/> : ''}
            {imagesBd === null ? <NoImage/> : ''}
            {/* {imagesBd.length ? searchBar : ''} */}
            {imagesBd && searchBar}
            {/* {(imagesBd && imagesBd.length) ? searchBar : ''} */}
            {imagesBd.length ?
                <ImagesContainer>
                    {modal.open && <ImageModal images={images} setModal={setModal} index={modal.index} />}
                    {cards ? cards : 'Nenhuma imagem'}
                </ImagesContainer>
             :
                ''
            }
        </PageContainer>
    )
}
