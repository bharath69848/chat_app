import { clerkClient, getAuth } from "@clerk/express";
import { User } from "../models/User";

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
    next();
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

      user = await User.create({
        clerkId,
        name: clerkUser.firstName.trim(),
        email: clerkUser.emailAddresses[0]?.emailAddress,
        avatar: clerkUser.imageUrl
      });
    }

    res.json(user);
  }catch{
    res.status(500);
    next();
  }
}