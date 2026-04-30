import mongoose, { mongo } from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

export const connectDB = async () => {
  try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DATABASE CONNECTED SUCCESSFULLY");
  }
  catch(error){
    console.log("MongoDB error:",error);
    process.exit(1);
  }
}