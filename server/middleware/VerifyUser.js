import jwt from 'jsonwebtoken'
import { UserModel } from '../models/User.js'
import dotenv from 'dotenv'
dotenv.config({path:'../config/.env'})

//verfy user
export const verifyUser= (req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(authHeader)
    {
        //If authHeader exists, it splits the header string by space
        const token=authHeader.split(" ")[1];
        
        //If verification fails (e.g., the token is expired or invalid), err will contain an error
        //If the token is valid, the decoded payload is extracted.
        jwt.verify(token,process.env.JWT_SECRET_KEY,async (err,payload)=>{
            try{
            if(err){
               return res.status(401).json({error: "Unauthorized."});
            }
            const user= await UserModel.findOne({_id:payload._id}).select("-password");
            req.user=user;
            next();
        }
        
        catch(err){
            return res.status(500).json({error:err.message});
        }
        });
    }else{
        return res.status(403).json({error:"Forbidden"});
    }
};