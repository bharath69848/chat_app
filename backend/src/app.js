import express from 'express';
import authRoutes from "./routes/authRoutes.js"
import chatRoutes from "./routes/chatRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import userRoutes from "./routes/userRoutes.js"

import { clerkMiddleware } from '@clerk/express'
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(clerkMiddleware())
app.use(express.json());

app.get("/health", (req,res) => {
  res.json({status:"ALL OK!!!",message:"Server is running"})
});

app.use("/api/auth",authRoutes);
app.use("/api/chats",chatRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);

app.use(errorHandler);

export default app;