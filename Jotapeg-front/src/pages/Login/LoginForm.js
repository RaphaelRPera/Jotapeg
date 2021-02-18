import React, { useState } from 'react'
import { Button, TextField} from '@material-ui/core'
import { ButtonContainer, ErrorContainer, Form, Link } from './style'
import { useHistory } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { login } from '../../services/user'
import { goToSignUp } from '../../router/Coordinator'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../../store/User/User.actions'


export const LoginForm = () => {
    const history = useHistory()
    const [form, setForm, handleInputChange] = useForm({email:'', password:''})
    const [error, setError] = useState('')

    const dispatch = useDispatch()

    const inputChange = (event) => {
        setError('')
        handleInputChange(event)
    }

    const onClickSubmit = (event) => {
        event.preventDefault()
        
        const inputPassword = document.getElementById('input-password')
        const passwordIsValid = inputPassword.checkValidity()
        inputPassword.reportValidity()

        const inputEmail = document.getElementById('input-email')
        const emailIsValid = inputEmail.checkValidity()
        inputEmail.reportValidity()

        if (emailIsValid && passwordIsValid) {
            // login(form, setError, dispatch, history)
            dispatch(userLogin(form))
        }
    }

    const inputEmail = 
        <TextField
            label={'Email ou apelido'}
            variant={'outlined'}
            name={'email'}
            onChange={inputChange}
            value={form.email}
            margin={'normal'}
            required
            autoFocus
            id={'input-email'}
            size="small"
        />

    const inputPassword = 
        <TextField
            label={'Senha'}
            variant={'outlined'}
            name={'password'}
            type={'password'}
            onChange={inputChange}
            value={form.password}
            margin={'normal'}
            required
            // autoFocus
            id={'input-password'}
            size="small"            
        />
    
    const buttonLogin = 
        <Button
            color={'primary'}
            variant={'contained'}
            onClick={onClickSubmit}
            type={'submit'}
            fullWidth
        >Login
        </Button>

    const buttonSignUp = 
        <Button
            onClick={() => goToSignUp(history)}
            color={'primary'}
            size={'small'}
        >Cadastre-se
        </Button>


    return (
        <Form>
            <ErrorContainer error={error} > {error} </ErrorContainer>
            {inputEmail}
            {inputPassword}

            <ButtonContainer>
                {buttonLogin}
                {buttonSignUp}
            </ButtonContainer>
        </Form>
    )
}
