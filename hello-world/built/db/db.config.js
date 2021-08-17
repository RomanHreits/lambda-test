"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConfig = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class DatabaseConfig {
    constructor() {
    }
    static getClient() {
        if (!DatabaseConfig.client) {
            console.log(process.env.CONNECT_STR);
            DatabaseConfig.client = new pg_1.Client(process.env.CONNECT_STR);
        }
        return DatabaseConfig.client;
    }
}
exports.DatabaseConfig = DatabaseConfig;
//# sourceMappingURL=db.config.js.map