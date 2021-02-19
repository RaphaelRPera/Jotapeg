"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = require("./src/router/router");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mySqlSetup_1 = require("./src/services/mySqlSetup");
dotenv_1.default.config();
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
mySqlSetup_1.createTables.createTables();
app.use('/user', router_1.userRouter);
app.use('/image', router_1.imageRouter);
app.listen(process.env.PORT || process.env.LOCAL_PORT, () => {
    console.log(`Server running on port ${process.env.PORT || process.env.LOCAL_PORT}`);
});
//# sourceMappingURL=index.js.map