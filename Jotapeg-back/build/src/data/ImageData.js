"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageData = void 0;
const CustomError_1 = require("../error/CustomError");
const BaseDataBase_1 = require("./BaseDataBase");
class ImageData extends BaseDataBase_1.BaseDataBase {
    constructor() {
        super(...arguments);
        this.createImage = (image) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, subtitle, user_id, date, file, collection } = image;
                yield this.connection('JPG_IMAGE')
                    .insert({
                    id, subtitle, user_id, date, file, collection
                });
            }
            catch (error) {
                const { statusCode, code, message, sqlMessage } = error;
                switch (error.code) {
                    case "ER_DUP_ENTRY":
                        throw new CustomError_1.CustomError(403, 'Image already on the system');
                        break;
                    default:
                        throw new CustomError_1.CustomError(statusCode || code, sqlMessage || message);
                        break;
                        break;
                }
            }
        });
        this.createTag = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, tag } = data;
                yield this.connection('JPG_TAG')
                    .insert({
                    id, tag
                });
            }
            catch (error) {
                const { statusCode, code, message, sqlMessage } = error;
                switch (error.code) {
                    case "ER_DUP_ENTRY":
                        return;
                    default:
                        throw new CustomError_1.CustomError(statusCode || code, sqlMessage || message);
                        break;
                        break;
                }
            }
        });
        this.createImageTag = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { image_id, tag_id } = data;
                yield this.connection('JPG_IMAGE_TAG')
                    .insert({
                    image_id, tag_id
                });
            }
            catch (error) {
                const { statusCode, code, message, sqlMessage } = error;
                switch (error.code) {
                    case "ER_DUP_ENTRY":
                        ;
                        break;
                    default:
                        throw new CustomError_1.CustomError(statusCode || code, sqlMessage || message);
                        break;
                        break;
                }
            }
        });
        this.getImageByFile = (file) => __awaiter(this, void 0, void 0, function* () {
            try {
                const image = yield this.connection('JPG_IMAGE')
                    .select('*')
                    .where({ file });
                return image;
            }
            catch (error) {
                const { statusCode, message } = error;
                throw new CustomError_1.CustomError(statusCode, message);
            }
        });
        this.getImageById = (id, user_id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const queryResult = yield this.connection('JPG_IMAGE')
                    .select('*')
                    .where({ id })
                    .andWhere({ user_id });
                if (!queryResult.length) {
                    throw new CustomError_1.CustomError(404, 'Image not found');
                }
                return queryResult[0];
            }
            catch (error) {
                const { statusCode, message } = error;
                throw new CustomError_1.CustomError(statusCode, message);
            }
        });
        this.getImageAll = (user_id) => __awaiter(this, void 0, void 0, function* () {
            try {
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
            `;
                const queryResult = yield this.connection.raw(sqlRaw);
                if (!queryResult.length) {
                    throw new CustomError_1.CustomError(404, 'No images');
                }
                return queryResult[0];
            }
            catch (error) {
                const { code, statusCode, message } = error;
                throw new CustomError_1.CustomError(statusCode, message);
            }
        });
        this.getTagByName = (name) => __awaiter(this, void 0, void 0, function* () {
            try {
                const tag = yield this.connection('JPG_TAG')
                    .select('*')
                    .where({ tag: name });
                return tag;
            }
            catch (error) {
                const { statusCode, message } = error;
                throw new CustomError_1.CustomError(statusCode, message);
            }
        });
        this.getImageTag = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { image_id, tag_id } = data;
                const imageTag = yield this.connection('JPG_IMAGE_TAG')
                    .select('*')
                    .where({ image_id })
                    .andWhere({ tag_id });
                return imageTag;
            }
            catch (error) {
                const { statusCode, message } = error;
                throw new CustomError_1.CustomError(statusCode, message);
            }
        });
        this.deleteImage = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connection('JPG_IMAGE')
                    .delete()
                    .where({ id });
                return `[imageData]: [deleteImage]: [RETURN]`;
            }
            catch (error) {
                const { code, message, statusCode } = error;
                throw new CustomError_1.CustomError(statusCode, message);
            }
        });
        this.deleteImageTag = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connection('JPG_IMAGE_TAG')
                    .delete()
                    .where({ image_id: id });
                return `[imageData]: [deleteImageTag]: [RETURN]`;
            }
            catch (error) {
                let { code, message } = error;
                let statusCode = 400;
                if (code === `ER_BAD_FIELD_ERROR`) {
                    statusCode = 500;
                    message = `Internal Server Error`;
                }
                throw new CustomError_1.CustomError(statusCode, message);
            }
        });
    }
}
exports.imageData = new ImageData();
//# sourceMappingURL=ImageData.js.map