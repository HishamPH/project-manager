import express, { Request, Response, NextFunction, Application } from "express";
import cors from "cors";
import session from "express-session";
import path from "path";
import cookieParser from "cookie-parser";
import { EventEmitter } from "events";
import userRouter from "../routes/userRouter";

import { swaggerUi, swaggerSpec } from "./swagger";

const app: Application = express();
import { config } from "dotenv";
config();

const createServer = async () => {
  try {
    const corsOptions = {
      origin: process.env.ORIGIN || "*",
      credentials: true,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
      allowedHeaders:
        "Origin,X-Requested-With,Content-Type,Accept,Authorization",
      optionsSuccessStatus: 200,
    };
    app.use(cors(corsOptions));
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(express.static(path.join(__dirname, "../../../public")));

    //swagger setup

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use(
      session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
      })
    );
    EventEmitter.defaultMaxListeners = 20;
    app.use("/user", userRouter);
    //error middle ware
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      console.error(err);
      res.status(500).send("Internal server error! from backend side");
    });

    return app;
  } catch (error) {
    console.log(error);
  }
};

export default createServer;
