"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./framework/config/server"));
const connectDB_1 = __importDefault(require("./framework/config/connectDB"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const startServer = async () => {
    try {
        await (0, connectDB_1.default)();
        const app = await (0, server_1.default)();
        const port = process.env.PORT;
        app?.listen(port, async () => {
            console.log("server is running on port ", port);
        });
    }
    catch (error) {
        console.log(error);
    }
};
startServer();
