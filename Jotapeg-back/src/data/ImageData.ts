import { CustomError } from '../error/CustomError'
import { BaseDataBase } from './BaseDataBase'


class ImageData extends BaseDataBase {
    public createImage = async (image: any):Promise<void> => {
        try {
            const {id, subtitle, user_id, date, file, collection} = image
            await this.connection('JPG_IMAGE')
                .insert({
                    id, subtitle, user_id, date, file, collection
                })
        } catch (error) {
            const {statusCode, code, message, sqlMessage} = error

            switch (error.code) {
                case "ER_DUP_ENTRY":
                    throw new CustomError(403, 'Image already on the system'); break;
                default:
                    throw new CustomError(statusCode || code, sqlMessage || message); break;
                    break;
            }
        }
    }


    public createTag = async (data: any):Promise<any> => {
        try {
            const {id, tag} = data
            await this.connection('JPG_TAG')
                .insert({
                    id, tag
                })
        } catch (error) {
            const {statusCode, code, message, sqlMessage} = error

            switch (error.code) {
                case "ER_DUP_ENTRY":
                    return
                default:
                    throw new CustomError(statusCode || code, sqlMessage || message); break;
                    break;
            }
        }
    }


    public createImageTag = async (data: any):Promise<void> => {
        try {
            const {image_id, tag_id} = data
            await this.connection('JPG_IMAGE_TAG')
                .insert({
                    image_id, tag_id
                })
        } catch (error) {
            const {statusCode, code, message, sqlMessage} = error

            switch (error.code) {
                case "ER_DUP_ENTRY":
                    /*console.log(`[data]: [createImageTag]: error`, error.code)*/; break;
                    // throw new CustomError(403, 'ImageTag already exists'); break;
                default:
                    // console.log(`[data]: [createImageTag]: error`, error.code);
                    throw new CustomError(statusCode || code, sqlMessage || message); break;
                    break;
            }
        }
    }


    public getImageByFile = async (file:string):Promise<any> => {
        try {
            const image = await this.connection('JPG_IMAGE')
                .select('*')
                .where({file})
            return image
        } catch (error) {
            const {statusCode, message} = error 
            throw new CustomError(statusCode, message)
        }
    }


    public getImageById = async (id:string, user_id:string):Promise<any> => {
        try {
            const queryResult = await this.connection('JPG_IMAGE')
                .select('*')
                .where({id})
                .andWhere({user_id})
            if (!queryResult.length) {throw new CustomError(404, 'Image not found')}
            return queryResult[0]
        } catch (error) {
            const {statusCode, message} = error
            throw new CustomError(statusCode, message)
        }
    }


    public getImageAll = async (user_id:string):Promise<any> => {
        try {
            // const queryResult = await this.connection('JPG_IMAGE')
            //     .select('*')
            //     .where({user_id})

            
            // const sqlRaw = `
            //     SELECT JPG_IMAGE.id, subtitle, date, file, collection, JPG_TAG.tag
            //     FROM JPG_IMAGE 
            //     JOIN JPG_IMAGE_TAG
            //     ON JPG_IMAGE_TAG.image_id = JPG_IMAGE.id AND JPG_IMAGE.user_id = '${user_id}'
            //     JOIN JPG_TAG
            //     ON JPG_TAG.id = JPG_IMAGE_TAG.tag_id
            //     ORDER BY JPG_IMAGE.id ASC
            //     ;
            // `
            
            const sqlRaw = `
                SELECT JPG_USER.nickname, JPG_IMAGE.id, subtitle, date, file, collection, JPG_TAG.tag
                FROM JPG_IMAGE 
                JOIN JPG_IMAGE_TAG
                ON JPG_IMAGE_TAG.image_id = JPG_IMAGE.id AND JPG_IMAGE.user_id = '${user_id}'
                JOIN JPG_TAG
                ON JPG_TAG.id = JPG_IMAGE_TAG.tag_id
                JOIN JPG_USER
                ON JPG_USER.id = JPG_IMAGE.user_id
                ORDER BY JPG_IMAGE.id ASC
                ;
            `

            const queryResult = await this.connection.raw(sqlRaw)

            // console.log(queryResult[0])

            if (!queryResult.length) {throw new CustomError(404, 'No images')}

            return queryResult[0]
        } catch (error) {
            const {code, statusCode, message} = error
            // console.log(`[imageData]: [getImageAll]: [error]:`, error.code, error)
            throw new CustomError(statusCode, message)
        }
    }


    public getTagByName = async (name:string):Promise<any> => {
        try {
            const tag = await this.connection('JPG_TAG')
                .select('*')
                .where({tag:name})
            return tag
        } catch (error) {
            const {statusCode, message} = error 
            throw new CustomError(statusCode, message)
        }
    }

    public getImageTag = async (data:any):Promise<any> => {
        try {
            const {image_id, tag_id} = data
            const imageTag = await this.connection('JPG_IMAGE_TAG')
                .select('*')
                .where({image_id})
                .andWhere({tag_id})
            return imageTag
        } catch (error) {
            const {statusCode, message} = error 
            throw new CustomError(statusCode, message)
        }
    }

    public deleteImage = async (id:string):Promise<any> => {
        try {
            await this.connection('JPG_IMAGE')
                .delete()
                .where({id})

            return `[imageData]: [deleteImage]: [RETURN]`
        } catch (error) {
            const {code, message, statusCode} = error
            // console.log(`[imageData]: [deleteImage]: [error]:`, code, message)
            throw new CustomError(statusCode, message)
        }
    }


    public deleteImageTag = async (id:string):Promise<any> => {
        try {
            await this.connection('JPG_IMAGE_TAG')
                .delete()
                .where({image_id:id})

            return `[imageData]: [deleteImageTag]: [RETURN]`
        } catch (error) {
            let {code, message} = error
            // console.log(`[imageData]: [deleteImageTag]: [error]:`, code, message)
            let statusCode = 400
            if (code === `ER_BAD_FIELD_ERROR`) {
                statusCode = 500
                message = `Internal Server Error`
            }
            throw new CustomError(statusCode, message)
        }
    }

}


export const imageData:ImageData = new ImageData()
