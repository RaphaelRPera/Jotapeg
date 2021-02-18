import React, { useState } from 'react'
import { Button, TextField} from '@material-ui/core'
import { ButtonContainer, ErrorContainer, Form } from './style'
import { useHistory } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { signUp } from '../../services/user'
// import { protectPage } from '../../hooks/protectPage'
import { useDispatch } from 'react-redux'


export const SignUpForm = () => {
    const history = useHistory()

    // protectPage('signup', history)

    const [form, setForm, handleInputChange] = useForm(
        {name:'', nickname:'', email:'', password:'', repassword:''}
    )
    const [error, setError] = useState('')
    
    const dispatch = useDispatch()

    const inputChange = (event) => {
        setError('')
        handleInputChange(event)
    }

    const onClickSubmit = (event) => {
        event.preventDefault()

        if (form.password !== form.repassword) {
            setError('* Senhas não são iguais')
            return
        }

        const inputRepassword = document.getElementById('input-repassword')
        const repasswordIsValid = inputRepassword.checkValidity()
        inputRepassword.reportValidity()

        const inputPassword = document.getElementById('input-password')
        const passwordIsValid = inputPassword.checkValidity()
        inputPassword.reportValidity()

        const inputEmail = document.getElementById('input-email')
        const emailIsValid = inputEmail.checkValidity()
        inputEmail.reportValidity()

        const inputNickname = document.getElementById('input-nickname')
        const nicknameIsValid = inputNickname.checkValidity()
        inputNickname.reportValidity()

        const inputName = document.getElementById('input-name')
        const nameIsValid = inputName.checkValidity()
        inputName.reportValidity()

        if (nameIsValid && nicknameIsValid && emailIsValid && passwordIsValid && repasswordIsValid) {
            signUp(form, setError, dispatch, form.nickname, history)
        }
    }

    const inputName = 
        <TextField
            label={'Nome'}
            variant={'outlined'}
            name={'name'}
            onChange={inputChange}
            value={form.name}
            margin={'normal'}
            required
            autoFocus
            id={'input-name'}
            size="small"
        />

    const inputNickname = 
        <TextField
            label={'Apelido'}
            variant={'outlined'}
            name={'nickname'}
            onChange={inputChange}
            value={form.nickname}
            margin={'normal'}
            required
            // autoFocus
            id={'input-nickname'}
            size="small"
        />

    const inputEmail = 
        <TextField
            label={'Email'}
            variant={'outlined'}
            name={'email'}
            type={'email'}
            onChange={inputChange}
            value={form.email}
            margin={'normal'}
            required
            // autoFocus
            id={'input-email'}
            size="small"
        />

    const inputPassword = 
        <TextField
            label={'Senha'}
            variant={'outlined'}
            name={'password'}
            type={'password'}
            onChange={handleInputChange}
            value={form.password}
            margin={'normal'}
            required
            // autoFocus
            id={'input-password'}
            size="small"            
        />

    const inputRePassword = 
        <TextField
            label={'Confirme a senha'}
            variant={'outlined'}
            name={'repassword'}
            type={'password'}
            onChange={inputChange}
            value={form.repassword}
            margin={'normal'}
            required
            // autoFocus
            id={'input-repassword'}
            size="small"            
        />

    const buttonSignUp = 
        <Button
            color={'primary'}
            variant={'contained'}
            onClick={onClickSubmit}
            type={'submit'}
            fullWidth
            disabled={error ? true : false}
        >Cadastrar
        </Button>

    return (
        <Form>
            <ErrorContainer error={error} > {error} </ErrorContainer>

            {inputName}
            {inputNickname}
            {inputEmail}
            {inputPassword}
            {inputRePassword}

            <ButtonContainer>
                {buttonSignUp}
            </ButtonContainer>

        </Form>
    )
}
