"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const events_1 = require("events");
const userRouter_1 = __importDefault(require("../routes/userRouter"));
const app = (0, express_1.default)();
console.log(process.env.PORT);
const createServer = async () => {
    try {
        const corsOptions = {
            origin: process.env.ORIGIN || "*",
            credentials: true,
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
            allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization",
            optionsSuccessStatus: 200,
        };
        app.use((0, cors_1.default)(corsOptions));
        app.use((0, cookie_parser_1.default)());
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use(express_1.default.static(path_1.default.join(__dirname, "../../../public")));
        app.use((0, express_session_1.default)({
            secret: "your-secret-key",
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false },
        }));
        events_1.EventEmitter.defaultMaxListeners = 20;
        app.use("/user", userRouter_1.default);
        //error middle ware
        app.use((err, req, res, next) => {
            console.error(err);
            res.status(500).send("Internal server error! from backend side");
        });
        return app;
    }
    catch (error) {
        console.log(error);
    }
};
exports.default = createServer;
