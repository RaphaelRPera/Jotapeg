import React, { useState } from 'react'
import { Button, TextField} from '@material-ui/core'
import { ButtonContainer, AlertContainer, Form } from './style'
import { useForm } from '../../hooks/useForm'
import { addImage } from '../../services/image'


export const CreateImageForm = () => {
    const [form, setForm, handleInputChange] = useForm(
        {file:'', subtitle:'', tags:'', collection:''}
    )
    const [alert, setAlert] = useState({active: false, type: 'none', message: ''})
    const [isLoading, setIsLoading] = useState(false)

    const inputChange = (event) => {
        setAlert({active: false, type: 'none', message: ''})
        handleInputChange(event)
    }

    const inputTagChange = (event) => {
        setAlert({active: false, type: 'none', message: ''})
        const value = event.target.value
        const newValue = value.replace(' ','')
        setForm({...form, tags: newValue})
    }

    const newTags = (tags) => {
        const newTags = tags.length && tags.split(';')
        return newTags
    }


    const onClickSubmit = async (event) => {
        event.preventDefault()

        const inputCollection = document.getElementById('input-collection')
        const collectionIsValid = inputCollection.checkValidity()
        inputCollection.reportValidity()

        const inputTags = document.getElementById('input-tags')
        const tagsIsValid = inputTags.checkValidity()
        inputTags.reportValidity()

        const inputSubtitle = document.getElementById('input-subtitle')
        const subtitleIsValid = inputSubtitle.checkValidity()
        inputSubtitle.reportValidity()

        const inputFile = document.getElementById('input-file')
        const fielIsValid = inputFile.checkValidity()
        inputFile.reportValidity()

        if (fielIsValid && subtitleIsValid && tagsIsValid && collectionIsValid) {
            setIsLoading(true)
            const formState = {file:'', subtitle:'', tags:'', collection:''}
            const tags = newTags(form.tags)
            const image = {...form, tags}
            await addImage(image).then(
                response => {
                    setIsLoading(false)
                    switch (response.status) {
                        case 409:
                            setAlert({active: true, type:'error', message:'* Imagem já cadastrada'}); setIsLoading(false); break;
                        case 200:
                            setAlert({active: true, type:'success', message:'Imagem adicionada com sucesso'}); setIsLoading(false); setForm(formState); break;
                        default: setAlert({active: true, type:'error', message:'* Erro ao cadastrar imagem'}); setIsLoading(false); break;
                    }
                }
            )
        }
    }

    return (
        <Form>
            <AlertContainer alert={alert}> {alert.message} </AlertContainer>
            <TextField
                label={'Imagem (url)'}
                variant={'outlined'}
                name={'file'}
                onChange={inputChange}
                value={form.file}
                margin={'normal'}
                required
                autoFocus
                id={'input-file'}
                size="small"
            />
            <TextField
                label={'Descrição'}
                variant={'outlined'}
                name={'subtitle'}
                onChange={inputChange}
                value={form.subtitle}
                margin={'normal'}
                required
                id={'input-subtitle'}
                size="small"
            />
            <TextField
                label={'Tags (separadas por ;)'}
                variant={'outlined'}
                name={'tags'}
                onChange={inputTagChange}
                value={form.tags}
                margin={'normal'}
                required
                id={'input-tags'}
                size="small"
            />
            <TextField
                label={'Coleção'}
                variant={'outlined'}
                name={'collection'}
                onChange={inputChange}
                value={form.collection}
                margin={'normal'}
                required
                id={'input-collection'}
                size="small"            
            />
            <ButtonContainer>
                <Button
                    color={'primary'}
                    variant={'contained'}
                    onClick={onClickSubmit}
                    type={'submit'}
                    fullWidth
                    disabled={((alert.active && alert.type === 'error') || isLoading) ? true : false}
                >{isLoading ? 'processando...' : 'Adicionar'}
                </Button>
            </ButtonContainer>
        </Form>
    )
}
