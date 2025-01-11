import createServer from "./framework/config/server";
import connectDB from "./framework/config/connectDB";

import { config } from "dotenv";
config();

const startServer = async () => {
  try {
    await connectDB();
    const app = await createServer();
    const port = process.env.PORT;
    app?.listen(port, async () => {
      console.log("server is running on port ", port);
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();
