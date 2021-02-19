"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageRouter = exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const ImageController_1 = require("../controller/ImageController");
const UserController_1 = require("../controller/UserController");
exports.userRouter = express_1.default.Router();
exports.userRouter.post('/signup', UserController_1.userController.createUser);
exports.userRouter.post('/login', UserController_1.userController.login);
exports.userRouter.get('/validate', UserController_1.userController.validateUser);
exports.imageRouter = express_1.default.Router();
exports.imageRouter.post('/', ImageController_1.imageController.createImage);
exports.imageRouter.get('/all', ImageController_1.imageController.getImageAll);
exports.imageRouter.get('/:id', ImageController_1.imageController.getImageById);
exports.imageRouter.delete('/:id', ImageController_1.imageController.deleteImage);
//# sourceMappingURL=router.js.map