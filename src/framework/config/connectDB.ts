import { Sequelize } from "sequelize";
export const sequelize = new Sequelize(
  process.env.DB_NAME || "default_db",
  process.env.DB_USER || "default_user",
  process.env.DB_PASSWORD || "password",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("connedted to the database");
  } catch (error) {
    console.log("error in connecting to the database", error);
  }
};

export default connectDB;
