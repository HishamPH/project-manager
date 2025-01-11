"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize(process.env.DB_NAME || "default_db", process.env.DB_USER || "default_user", process.env.DB_PASSWORD || "password", {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    logging: false,
});
const connectDB = async () => {
    try {
        await exports.sequelize.authenticate();
        console.log("connedted to the database");
    }
    catch (error) {
        console.log("error in connecting to the database");
    }
};
exports.default = connectDB;
