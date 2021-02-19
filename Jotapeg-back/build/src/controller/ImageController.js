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
exports.imageController = void 0;
const ImageBusiness_1 = require("../business/ImageBusiness");
class ImageController {
    constructor() {
        this.createImage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const imageResult = yield ImageBusiness_1.imageBusiness.createImage({ token, body: req.body });
                yield ImageBusiness_1.imageBusiness.createTag(req.body.tags);
                const newImageTag = { image_id: imageResult.id, tags: req.body.tags };
                yield ImageBusiness_1.imageBusiness.createImageTag(newImageTag);
                res.status(200).send(imageResult);
            }
            catch (error) {
                const { statusCode, message } = error;
                switch (message) {
                    case "Cannot read property 'id' of undefined":
                        res.status(statusCode || 500).send({ message: 'Internal Server Error' });
                        break;
                    default:
                        res.status(statusCode || 400).send({ message });
                        break;
                }
            }
        });
        this.getImageById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const token = req.headers.authorization;
                const image = yield ImageBusiness_1.imageBusiness.getImageById({ id, token });
                res.status(200).send(image);
            }
            catch (error) {
                const { statusCode, message } = error;
                res.status(statusCode || 400).send({ message });
            }
        });
        this.getImageAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('ImageController > getImageAll');
            try {
                const token = req.headers.authorization;
                const image = yield ImageBusiness_1.imageBusiness.getImageAll({ token });
                res.status(200).send(image);
            }
            catch (error) {
                const { statusCode, message } = error;
                res.status(statusCode || 400).send({ message });
            }
        });
        this.deleteImage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield ImageBusiness_1.imageBusiness.deleteImageTag(id);
                yield ImageBusiness_1.imageBusiness.deleteImage(id);
                res.status(200).send({ message: `Image successfully deleted` });
            }
            catch (error) {
                const { statusCode, message } = error;
                res.status(statusCode || 400).send({ message });
            }
        });
    }
}
exports.imageController = new ImageController();
//# sourceMappingURL=ImageController.js.map