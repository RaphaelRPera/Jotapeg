import React, { useEffect, useState } from 'react'
import { SearchBar } from '../../components/SearchBar/SearchBar'
import { FilterButton, FilterClose, FilterText, ModalOpen, PageContainer } from './styleContainer'
import { ImageModal } from '../../components/ImageModal/ImageModal'
// import { useGetImages } from '../../hooks/useGetImages'
import { useDispatch, useSelector } from 'react-redux'
import { getImages } from '../../store/Images/Images.actions'
import { removeAcento } from '../../hooks/RemoveAcento'
import { Card } from '../../components/Card/Card'
import { CardPageContainer } from '../../components/CardPageContainer/style'
import { NoCollections } from './NoCollec'
import { Loading } from '../../components/Loading/Loading'

export const CollecContainer = () => {
    const [modal, setModal] = useState(null)
    const [imageOrder, setImageOrder] = useState('desc')
    const [showCollection, setShowCollection] = useState(false)


    const imagesBd = useSelector(state => state.images)
    console.log('CollecContainer: imagesBd:', imagesBd)
    const dispatch = useDispatch()
    // if (!imagesBd) {dispatch(getImages())}
    const searchText = useSelector(state => state.searchBar)

    //  rotina para inserir em cada imagem todas as suas tags
    let images = []
    let imageList = []
    // if (imagesBd) {
    //     for (let i = 0; i < imagesBd.length; i++) {
    //         const image = imagesBd[i]
    //         const imageId = image.id
    //         const listIndex = imageList.indexOf(imageId)
    //         if (listIndex < 0) {
    //             imageList.push(imageId)
    //             const newImage = {...image, date: new Date(image.date), tags: [image.tag]}
    //             delete newImage.tag
    //             images.push(newImage)
    //         } else {
    //             images[listIndex].tags.push(image.tag)
    //         }
    //     }
    // }
    if (showCollection) {
        images = showCollection.images
    } else if (imagesBd) {
        for (let i = 0; i < imagesBd.length; i++) {
            const image = imagesBd[i]
            const imageId = image.id
            const listIndex = imageList.indexOf(imageId)
            if (listIndex < 0) {
                imageList.push(imageId)
                const newImage = {...image, date: new Date(image.date), tags: [image.tag]}
                delete newImage.tag
                images.push(newImage)
            } else {
                images[listIndex].tags.push(image.tag)
            }
        }
    }

    //  rotina para agrupar imagens da mesma coleção
    let collectionList = []
    let collections = []
    if (images) {
        for (let i = 0; i < images.length; i++) {
            const image = images[i]
            const imageCollection = image.collection
            const listIndex = collectionList.indexOf(imageCollection)
            if (listIndex < 0) {
                collectionList.push(imageCollection)
                // collections = {...collections, [collection]: [image]}
                collections.push({name: imageCollection, images: [image]})
            } else {
                for (let z = 0; z < collections.length; z++) {
                    const collection = collections[z]
                    if (collection.name === imageCollection) {
                        collection.images.push(image)
                    }
                }
            }
        }
    }


    if (images.length) {
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


    const collectionCardClick = (index) => {
        setShowCollection(collections[index])
    }

    const imageCardClick = (index) => {
        setModal(index)
    }


    const collectionCards = collections.length ? collections.map((collection, index) => {
        const {name, images} = collection
        const coverImage = images[0]
        const formatName = removeAcento(name.toLowerCase())
        const search = searchText ? removeAcento(searchText.toLowerCase()) : ''

        if (search.length > 2) {
            if (formatName.includes(search)) {
                return <Card key={index} image={coverImage} index={index} cardClick={collectionCardClick} hoverText={name}/>
            }
        } else {
            return <Card key={index} image={coverImage} index={index} cardClick={collectionCardClick} hoverText={name} />

        }
    })
    :
    ''


    const imageCards = showCollection && showCollection.images.map((image, index) => {
        const hoverText = image.subtitle
        return <Card key={index} image={image} index={index} cardClick={imageCardClick} hoverText={hoverText}/>
    })


    useEffect(() => {
        dispatch(getImages())
    }, [])

    return (
        <PageContainer>
            {/* {imagesBd === false ? <Loading/> : ''} */}
            {imagesBd === false ? <Loading/> : !collections.length && <NoCollections/>}
            {/* {!collections.length && <NoCollections/>} */}
            {collections.length ? <SearchBar placeholder='nome da coleção...'/> : ''}

            {modal !== null && <ImageModal images={images} setModal={setModal} index={modal} />}

            {showCollection &&
                <FilterButton>
                    <FilterText> {`${showCollection.name}`} </FilterText>
                    <FilterClose onClick={() => setShowCollection(false)} > x </FilterClose>
                </FilterButton>
            }

            <CardPageContainer>
                {showCollection ? imageCards : collectionCards}
            </CardPageContainer>
        </PageContainer>
    )
}