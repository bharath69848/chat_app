import { clerkClient, getAuth } from "@clerk/express";
import { User } from "../models/User.js";

export async function getMe(req,res,next){
  try{
    const userId = req.userId;
    const user = await User.findById(userId);

    if(!user){
      res.status(404).json({message:"User not found"});
      return;
    }

    res.status(200).json(user);
  }

  catch(error){
    res.status(500);
    next(error);
  }
}


export async function authCallback(req,res,next){
  try{
    const {userId: clerkId} = getAuth(req);

    if(!clerkId){
      res.status(401).json({message:"Unauthorized"});
      return;
    }

    let user = await User.findOne({clerkId})

    if(!user){
       const clerkUser = await clerkClient.users.getUser(clerkId);
       const name = [clerkUser.firstName, clerkUser.lastName]
         .filter(Boolean)
         .join(" ")
         .trim();
       const email = clerkUser.emailAddresses?.[0]?.emailAddress;
       if (!name || !email) {
         return res.status(422).json({ message: "Missing required profile fields" });
       }
       user = await User.create({
         clerkId,
         name,
         email,
         avatar: clerkUser.imageUrl
       });
    }

    res.json(user);
  }catch(error){
    res.status(500);
    next(error);
  }
}