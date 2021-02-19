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
exports.imageBusiness = void 0;
const ImageData_1 = require("../data/ImageData");
const CustomError_1 = require("../error/CustomError");
const services_1 = require("../services/services");
const UserBusiness_1 = require("./UserBusiness");
const User_1 = require("../model/User");
class ImageBusiness {
    constructor() {
        this.createImage = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = data.token;
                const user = yield UserBusiness_1.userBusiness.validateUser(token);
                const { subtitle, file, tags, collection } = data.body;
                if (!subtitle) {
                    throw new CustomError_1.CustomError(400, 'Subtitle is required');
                }
                if (!file) {
                    throw new CustomError_1.CustomError(400, 'File is required');
                }
                if (!collection) {
                    throw new CustomError_1.CustomError(400, 'Collection is required');
                }
                const imageBd = yield ImageData_1.imageData.getImageByFile(file);
                if (!imageBd.length) {
                    const id = services_1.services.generateId();
                    const date = new Date();
                    const user_id = user && user.id;
                    const newImage = { id, subtitle, user_id, date, file, collection };
                    yield ImageData_1.imageData.createImage(newImage);
                    return { id, message: 'Image successfully created' };
                }
                else {
                    throw new CustomError_1.CustomError(409, 'Image already exists');
                    const id = imageBd[0].id;
                    return { id, message: 'Image already exists' };
                }
            }
            catch (error) {
                const { statusCode, message } = error;
                switch (message) {
                    case 'invalid signature':
                        throw new CustomError_1.CustomError(401, 'Unauthorized');
                        break;
                    default:
                        throw new CustomError_1.CustomError(statusCode, message);
                        break;
                }
            }
        });
        this.createTag = (tags) => __awaiter(this, void 0, void 0, function* () {
            if (tags.length) {
                const newTags = tags.map((tag) => {
                    const id = services_1.services.generateId();
                    return { id, tag };
                });
                try {
                    newTags.map((item) => __awaiter(this, void 0, void 0, function* () {
                        yield ImageData_1.imageData.createTag({ id: item.id, tag: item.tag.toLowerCase() });
                    }));
                }
                catch (error) {
                    const { statusCode, message } = error;
                    throw new CustomError_1.CustomError(statusCode, message);
                }
            }
        });
        this.createImageTag = (data) => __awaiter(this, void 0, void 0, function* () {
            const { image_id, tags } = data;
            if (tags.length) {
                try {
                    tags.map((tag) => __awaiter(this, void 0, void 0, function* () {
                        const tagBd = yield ImageData_1.imageData.getTagByName(tag);
                        const tag_id = tagBd[0].id;
                        const newImageTag = { image_id, tag_id };
                        const imageTagBd = yield ImageData_1.imageData.getImageTag(newImageTag);
                        if (!imageTagBd.length) {
                            yield ImageData_1.imageData.createImageTag(newImageTag);
                        }
                    }));
                }
                catch (error) {
                    const { statusCode, message } = error;
                    throw new CustomError_1.CustomError(statusCode, message);
                }
            }
        });
        this.getImageById = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, token } = data;
                if (!id) {
                    throw new CustomError_1.CustomError(406, 'Image ID is required');
                }
                if (!token) {
                    throw new CustomError_1.CustomError(401, 'Unauthorized');
                }
                const user = yield UserBusiness_1.userBusiness.validateUser(token);
                let image;
                if (id === 'all') {
                    if (user && user.role === User_1.UserRole.ADMIN) {
                        image = yield ImageData_1.imageData.getImageAll(user.id);
                    }
                    else {
                        throw new CustomError_1.CustomError(401, 'Unauthorized');
                    }
                }
                else {
                    image = user && (yield ImageData_1.imageData.getImageById(id, user.id));
                }
                return image;
            }
            catch (error) {
                const { statusCode, message } = error;
                throw new CustomError_1.CustomError(statusCode, message);
            }
        });
        this.getImageAll = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { token } = data;
                if (!token) {
                    throw new CustomError_1.CustomError(401, 'Unauthorized');
                }
                const user = services_1.services.getTokenData(token);
                const image = yield ImageData_1.imageData.getImageAll(user.id);
                return image;
            }
            catch (error) {
                const { statusCode, message } = error;
                let errorMessage = message;
                let errorCode = statusCode;
                switch (message) {
                    case 'jwt malformed':
                        errorCode = 401;
                        errorMessage = 'Unauthorized';
                        break;
                    default: break;
                }
                throw new CustomError_1.CustomError(errorCode, errorMessage);
            }
        });
        this.deleteImage = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id) {
                    throw new CustomError_1.CustomError(406, 'ID is required');
                }
                yield ImageData_1.imageData.deleteImage(id);
                return `[imageBusiness]: [deleteImage]: [RETURN]`;
            }
            catch (error) {
                const { statusCode, message } = error;
                throw new CustomError_1.CustomError(statusCode, message);
            }
        });
        this.deleteImageTag = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id) {
                    throw new CustomError_1.CustomError(406, 'ID is required');
                }
                yield ImageData_1.imageData.deleteImageTag(id);
                return `[imageBusiness]: [deleteImageTag]: [RETURN]`;
            }
            catch (error) {
                const { statusCode, message } = error;
                throw new CustomError_1.CustomError(statusCode, message);
            }
        });
    }
}
exports.imageBusiness = new ImageBusiness();
//# sourceMappingURL=ImageBusiness.js.map