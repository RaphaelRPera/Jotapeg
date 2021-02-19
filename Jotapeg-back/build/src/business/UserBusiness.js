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
exports.userBusiness = void 0;
const UserData_1 = require("../data/UserData");
const CustomError_1 = require("../error/CustomError");
const services_1 = require("../services/services");
class UserBusiness {
    constructor() {
        this.createUser = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, nickname, password, role } = user;
                if (!name) {
                    throw new CustomError_1.CustomError(400, 'User name is required');
                }
                if (!email) {
                    throw new CustomError_1.CustomError(400, 'User email is required');
                }
                if (!nickname) {
                    throw new CustomError_1.CustomError(400, 'User nickname is required');
                }
                if (!password || password.length < 6) {
                    throw new CustomError_1.CustomError(400, 'A password with at least 6 digits is required');
                }
                const id = services_1.services.generateId();
                const cypherPassword = yield services_1.services.hash(password);
                const input = {
                    id, name, email, nickname, password: cypherPassword, role
                };
                yield UserData_1.userData.createUser(input);
                const token = services_1.services.generateToken({ id, role });
                return token;
            }
            catch (error) {
                const { statusCode, message } = error;
                throw new CustomError_1.CustomError(statusCode, message);
            }
        });
        this.login = (loginData) => __awaiter(this, void 0, void 0, function* () {
            try {
                const loginEmail = loginData.email;
                const loginPassword = loginData.password;
                if (!loginEmail) {
                    throw new CustomError_1.CustomError(400, 'Email or nickname is required');
                }
                if (!loginPassword) {
                    throw new CustomError_1.CustomError(400, 'Password is required');
                }
                const user = loginEmail.includes('@') ?
                    yield UserData_1.userData.getUserByEmail(loginEmail) :
                    yield UserData_1.userData.getUserByNick(loginEmail);
                const passwordIsCorrect = yield services_1.services.compare(loginPassword, user.password);
                if (!passwordIsCorrect) {
                    throw new CustomError_1.CustomError(400, 'Invalid email or password');
                }
                const token = services_1.services.generateToken({ id: user.id, role: user.role });
                return { nickname: user.nickname, token };
            }
            catch (error) {
                const { statusCode, message } = error;
                throw new CustomError_1.CustomError(statusCode, message);
            }
        });
        this.validateUser = (token) => __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenData = services_1.services.getTokenData(token);
                const { id, role } = tokenData;
                const user = yield UserData_1.userData.getUserById(id);
                if (!user) {
                    throw new CustomError_1.CustomError(401, 'Unauthorized');
                }
                return user;
            }
            catch (error) {
                let { statusCode, message } = error;
                switch (message) {
                    case 'jwt expired':
                        statusCode = 401;
                        message = `Unauthorized. New login required`;
                        break;
                    case 'jwt malformed':
                        statusCode = 401;
                        message = `Unauthorized`;
                        break;
                    default:
                        statusCode = 401;
                        message = `Unauthorized`;
                        break;
                }
                throw new CustomError_1.CustomError(statusCode, message);
            }
        });
    }
}
exports.userBusiness = new UserBusiness();
//# sourceMappingURL=UserBusiness.js.map