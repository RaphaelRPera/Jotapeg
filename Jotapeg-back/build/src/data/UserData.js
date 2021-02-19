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
exports.userData = void 0;
const CustomError_1 = require("../error/CustomError");
const BaseDataBase_1 = require("./BaseDataBase");
class UserData extends BaseDataBase_1.BaseDataBase {
    constructor() {
        super(...arguments);
        this.createUser = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, name, email, nickname, password, role } = user;
                yield this.connection('JPG_USER')
                    .insert({ id, name, email, nickname, password, role });
            }
            catch (error) {
                const { statusCode, code, message, sqlMessage } = error;
                switch (error.code) {
                    case "ER_DUP_ENTRY":
                        throw new CustomError_1.CustomError(403, 'User already registered');
                        break;
                    default:
                        throw new CustomError_1.CustomError(statusCode || code, sqlMessage || message);
                        break;
                        break;
                }
            }
        });
        this.getUserByEmail = (emailInput) => __awaiter(this, void 0, void 0, function* () {
            try {
                const queryResult = yield this.connection('JPG_USER')
                    .select('*')
                    .where({ email: emailInput });
                if (!queryResult.length) {
                    throw new CustomError_1.CustomError(404, 'User not found');
                }
                const { id, name, email, nickname, password } = queryResult[0];
                const userData = { id, name, email, nickname, password };
                return userData;
            }
            catch (error) {
                const { statusCode, message } = error;
                switch (message) {
                    default:
                        throw new CustomError_1.CustomError(statusCode, message);
                        break;
                }
            }
        });
        this.getUserByNick = (nickInput) => __awaiter(this, void 0, void 0, function* () {
            try {
                const queryResult = yield this.connection('JPG_USER')
                    .select('*')
                    .where({ nickname: nickInput });
                if (!queryResult.length) {
                    throw new CustomError_1.CustomError(404, 'User not found');
                }
                const { id, name, email, nickname, password } = queryResult[0];
                const userData = { id, name, email, nickname, password };
                return userData;
            }
            catch (error) {
                const { statusCode, message } = error;
                throw new CustomError_1.CustomError(statusCode, message);
            }
        });
        this.getUserById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const queryResult = yield this.connection('JPG_USER')
                    .select('*')
                    .where({ id });
                if (!queryResult.length) {
                    throw new CustomError_1.CustomError(404, 'User not found');
                }
                return queryResult[0];
            }
            catch (error) {
                const { statusCode, message } = error;
                throw new CustomError_1.CustomError(statusCode, message);
            }
        });
    }
}
exports.userData = new UserData();
//# sourceMappingURL=UserData.js.map