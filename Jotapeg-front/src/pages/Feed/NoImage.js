import React from 'react'
import { PageContainer, Paragraph } from './styleNoImage'


export const NoImage = () => {
    return (
        <PageContainer>
            <Paragraph>
                Suas imagens aparecerão aqui!
            </Paragraph>

            <Paragraph>
                Adicione-as clicando no botão "+imagem" no topo da página
            </Paragraph>
        </PageContainer>
    )
}