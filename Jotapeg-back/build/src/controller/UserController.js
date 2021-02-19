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
exports.userController = void 0;
const UserBusiness_1 = require("../business/UserBusiness");
const CustomError_1 = require("../error/CustomError");
class UserController {
    constructor() {
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, nickname, password, role } = req.body;
                const input = {
                    name, email, nickname, password, role
                };
                const token = yield UserBusiness_1.userBusiness.createUser(input);
                res.status(200).send({ message: 'User successfully created', token });
            }
            catch (error) {
                const { statusCode, message } = error;
                res.status(statusCode || 400).send({ message });
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('UserController: login');
            try {
                const { email, password } = req.body;
                const loginData = { email, password };
                const userData = yield UserBusiness_1.userBusiness.login(loginData);
                res.status(200).send(userData);
            }
            catch (error) {
                const { statusCode, message } = error;
                res.status(statusCode || 400).send({ message });
            }
        });
        this.validateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                if (!token) {
                    throw new CustomError_1.CustomError(401, 'Unauthorized');
                }
                const user = yield UserBusiness_1.userBusiness.validateUser(token);
                res.status(200).send({ name: user === null || user === void 0 ? void 0 : user.name, nickname: user === null || user === void 0 ? void 0 : user.nickname, role: user === null || user === void 0 ? void 0 : user.role });
            }
            catch (error) {
                const { statusCode, message } = error;
                res.status(statusCode || 400).send({ message });
            }
        });
    }
}
exports.userController = new UserController();
//# sourceMappingURL=UserController.js.map