import { Jwt } from "jsonwebtoken";
import User from "../models/user.model";
export const protectedroute = async(req, res, next) => {
    try {

        const token = req.cookies.jwt;
        if(!token) {
           return  res.status(400).json({message: "unauthorized request"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {
           return res.status(400).json({message: "unauthorized request"})
        }
        const user = User.findById(decoded.userId);

        if(!user) {
            return  res.status(400).json({message: "user not found"})   
        }
        req.user = user;
        next();

    }
    catch(error) {
        console.log("error on the protectedroute");
        console.log(error.message);
        
        
    }
}