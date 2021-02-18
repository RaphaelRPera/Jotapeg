import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { protectPage } from '../../hooks/protectPage'
import { ImageContainer } from './ImageContainer'
import { PageContainer } from './style'


export const Feed = () => {
    const [protect, setProtect] = useState(false)
    const history = useHistory()

    const verifyProtect = () => {
        protectPage('feed', history) .then(() => { setProtect(true) })
    }

    useEffect(() => {
        verifyProtect()
    }, [])

    return (
        <>
            {protect &&
                <PageContainer>
                    <ImageContainer/>
                </PageContainer>
            }
        </>
    )
}
