import React, { useState } from 'react'
import { ButtonContainer, ButtonIcon, ButtonText, Img, LogoContainer, LogoFirstLetter, MainContainer, MenuContainer, PageContainer, Avatar } from './style'
import { useHistory } from 'react-router-dom'
import { goToLogin, goToAddImage, goToMyImages, goToCollections } from '../../router/Coordinator'
import { useSelector, useDispatch } from 'react-redux'
// import { setNickname } from '../../store/Nickname/Nickname.actions'
// import { setUser } from '../../store/User/User.actions'
import icons from '../../icons/icons'   //objeto contendo todos os icones da aplicação
// import { validateUser } from '../../services/user'
import { getUser } from '../../store/User/User.actions'




export const MainAppBar = () => {
    const history = useHistory()
    const user = useSelector(state => state.user)

    const dispatch = useDispatch()

    const [addImageIcon, setAddImageIcon] = useState(icons.addImageBlack)
    const [imageIcon, setImageIcon] = useState(icons.imageBlack)
    const [logoutIcon, setLogoutIcon] = useState(icons.logoutBlack)
    const [loginIcon, setLoginIcon] = useState(icons.loginBlack)
    const [collecIcon, setCollecIcon] = useState(icons.albumBlack)

    const logout = () => {
        setLogoutIcon(icons.logoutBlack)
        localStorage.removeItem('token')
        localStorage.removeItem('nickname')
        dispatch(getUser())
        goToLogin(history)
    }

    const logo = 
        <LogoContainer onClick={() => goToMyImages(history)} >
            <LogoFirstLetter>J</LogoFirstLetter>OTAPEG
        </LogoContainer>


    const buttonAddImage = 
        <ButtonContainer
            onClick={() => goToAddImage(history)}
            onMouseOver={() => setAddImageIcon(icons.addImageWhite)}
            onMouseLeave={() => setAddImageIcon(icons.addImageBlack)}
         >
            <ButtonIcon>
                <Img src={addImageIcon} alt="addImage" />
            </ButtonIcon>
            <ButtonText>adicionar</ButtonText>
        </ButtonContainer>

    const buttonMyImages = 
        <ButtonContainer
            onClick={() => goToMyImages(history)}
            onMouseOver={() => setImageIcon(icons.imageWhite)}
            onMouseLeave={() => setImageIcon(icons.imageBlack)}
         >
            <ButtonIcon>
                <Img src={imageIcon} alt="images" />
            </ButtonIcon>
            <ButtonText>imagens</ButtonText>
        </ButtonContainer>

    const avatar = 
        <ButtonContainer onClick={() => {alert(`Conectado como "${user.nickname}"`)}} >
            <ButtonIcon>
                <Avatar src={icons.faceSmirking} alt="avatar" />
            </ButtonIcon>
            
            <ButtonText> {user.nickname} </ButtonText>
        </ButtonContainer>

    const buttonLogin = 
        <ButtonContainer
           onClick={() => {goToLogin(history)}}
            onMouseOver={() => setLoginIcon(icons.loginWhite)}
            onMouseLeave={() => setLoginIcon(icons.loginBlack)}
         >
            <ButtonIcon>
                <Img src={loginIcon} alt="login" />
            </ButtonIcon>

            <ButtonText> entre </ButtonText>
        </ButtonContainer>

    const buttonLogout = 
        <ButtonContainer
            onClick={logout}
            onMouseOver={() => setLogoutIcon(icons.logoutWhite)}
            onMouseLeave={() => setLogoutIcon(icons.logoutBlack)}
         >
            <ButtonIcon>
                <Img src={logoutIcon} alt="logout" />
            </ButtonIcon>
            <ButtonText> sair </ButtonText>
        </ButtonContainer>

    const buttonCollections = 
        <ButtonContainer
            onClick={() => goToCollections(history)}
            onMouseOver={() => setCollecIcon(icons.albumWhite)}
            onMouseLeave={() => setCollecIcon(icons.albumBlack)}
         >
            <ButtonIcon>
                <Img src={collecIcon} alt="logout" />
            </ButtonIcon>
            <ButtonText> álbuns </ButtonText>
        </ButtonContainer>


    return (
        <PageContainer>
            <MainContainer>
                {logo}
                <MenuContainer>
                    {user ? buttonAddImage : ''}
                    {user ? buttonMyImages : ''}
                    {user ? buttonCollections : ''}
                    {user ? avatar : buttonLogin}
                    {user ? buttonLogout : ''}
                </MenuContainer>
            </MainContainer>
        </PageContainer>
    )
}
