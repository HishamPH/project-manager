import { setupAssociations } from "../database/models";
import { sequelize } from "./dbSetup";

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("connedted to the database");
    setupAssociations();
    await sequelize.sync({ force: true, alter: true });
    console.log("database is synced");
  } catch (error) {
    console.log("error in connecting to the database", error);
  }
};

export default connectDB;
