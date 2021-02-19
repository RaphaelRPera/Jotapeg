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
exports.createTables = void 0;
const BaseDataBase_1 = require("../data/BaseDataBase");
class CreateTables extends BaseDataBase_1.BaseDataBase {
    constructor() {
        super(...arguments);
        this.createTables = () => __awaiter(this, void 0, void 0, function* () {
            try {
                let createdMsg = 'tables created: ';
                const jpgUser = 'JPG_USER';
                if (!(yield this.tableExists(jpgUser))) {
                    yield this.connection.raw(`
                    CREATE TABLE ${jpgUser}(
                        id VARCHAR(255) PRIMARY KEY,
                        name VARCHAR(255) NOT NULL,
                        email VARCHAR(255) UNIQUE NOT NULL,
                        nickname VARCHAR(255) UNIQUE NOT NULL,
                        password VARCHAR(255) NOT NULL,
                        role ENUM("ADMIN", "NORMAL") DEFAULT "NORMAL"
                    );
                `);
                    createdMsg += `${jpgUser}, `;
                }
                const jpgImage = 'JPG_IMAGE';
                if (!(yield this.tableExists(jpgImage))) {
                    yield this.connection.raw(`
                    CREATE TABLE ${jpgImage}(
                        id VARCHAR(255) NOT NULL PRIMARY KEY,
                        subtitle VARCHAR(255) NOT NULL,
                        user_id VARCHAR(255) NOT NULL,
                        date DATE NOT NULL,
                        file MEDIUMTEXT NOT NULL,
                        collection VARCHAR(255) NOT NULL,
                        FOREIGN KEY (user_id) REFERENCES JPG_USER(id)
                    );
                `);
                    createdMsg += `${jpgImage}, `;
                }
                const jpgTag = 'JPG_TAG';
                if (!(yield this.tableExists(jpgTag))) {
                    yield this.connection.raw(`
                    CREATE TABLE ${jpgTag}(
                        id VARCHAR(255) PRIMARY KEY,
                        tag VARCHAR(255) UNIQUE NOT NULL
                    );
                `);
                    createdMsg += `${jpgTag}, `;
                }
                const jpgImageTag = 'JPG_IMAGE_TAG';
                if (!(yield this.tableExists(jpgImageTag))) {
                    yield this.connection.raw(`
                    CREATE TABLE ${jpgImageTag}(
                        image_id VARCHAR(255) NOT NULL,
                        tag_id VARCHAR(255) NOT NULL,
                        FOREIGN KEY (image_id) REFERENCES JPG_IMAGE(id),
                        FOREIGN KEY (tag_id) REFERENCES JPG_TAG(id)
                    );
                `);
                    createdMsg += `${jpgImageTag}, `;
                }
                createdMsg !== 'tables created: ' && console.log(createdMsg);
                console.log(`SQL Ok!`);
            }
            catch (error) {
                console.log('[Failure to create tables]: error:', error);
            }
        });
        this.tableExists = (tableName) => __awaiter(this, void 0, void 0, function* () {
            const queryResult = yield this.connection.raw(`
            SHOW TABLES LIKE "${tableName}";
        `);
            return queryResult[0].length > 0;
        });
    }
}
exports.createTables = new CreateTables();
//# sourceMappingURL=mySqlSetup.js.map