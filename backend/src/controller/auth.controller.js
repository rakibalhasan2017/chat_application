import User from '../models/user.model.js'
import {generateToken} from '../lib/utilities.js'
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

export const signup = async(req, res) => {
   try {
    const {email, fullname, password} = req.body;
    if(!email || !fullname || !password) {
       return res.status(400).send("fill all the fields");
    }
    const user = await User.findOne({email});
    if(user) {
      return  res.status(400).send("this email is already existed");
    }
    else {
        const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
        const hashedPassword = await bcrypt.hash(password, salt);
        const newuser = new User({
            email,
            fullname,
            password: hashedPassword,  // Store the hashed password
          });
        generateToken(newuser._id, res);
        await newuser.save();
        res.status(201).json({
            id:newuser._id,
            fullname:newuser.fullname,
            email:newuser.email,
            profilepic:newuser.profilepic,
        })
    }

   }
   catch(error) {
    console.log("something happened in sigup");
    res.status(400).send("signup error");
    console.log(error.message);
    
    
   }
}

export const login = (req, res) => {
    res.status(201).send("login route");
}

export const logout = (req, res) => {
    res.status(201).send("logout route");
}