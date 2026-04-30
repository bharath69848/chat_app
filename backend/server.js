import { connectDB } from "./src/config/database.js";
import app from "./src/app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT,() => {
    console.log("Server is running on PORT:",PORT);
  })
})