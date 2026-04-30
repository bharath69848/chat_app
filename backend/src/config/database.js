import mongoose, { mongo } from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

export const connectDB = async () => {
  try{
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not set");
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DATABASE CONNECTED SUCCESSFULLY");
  }
  catch(error){
    console.log("MongoDB error:",error);
    process.exit(1);
  }
}