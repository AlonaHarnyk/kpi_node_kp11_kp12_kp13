import { connectDB } from "./db/connect.js";
import app from "./app.js";

const startServer = async () => {
  try {
    await connectDB();
    app.listen(3000, () => {
      console.log("Server is running. Use our API on port: 3000");
    });
  } catch (error) {
    console.log(error);
  }
};


startServer()