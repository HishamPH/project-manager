import { Sequelize } from "sequelize";
import { config } from "dotenv";
config();
// export const sequelize = new Sequelize(
//   process.env.DB_NAME || "default_db",
//   process.env.DB_USER || "default_user",
//   process.env.DB_PASSWORD || "password",
//   {
//     host: process.env.DB_HOST || "localhost",
//     dialect: "postgres",
//     logging: false,
//   }
// );

export const sequelize = new Sequelize(process.env.DB_URI || "default_string", {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true, // Ensure SSL connection for secure communication
      rejectUnauthorized: false, // This option is typically required by Render for SSL connections
    },
  },
});
