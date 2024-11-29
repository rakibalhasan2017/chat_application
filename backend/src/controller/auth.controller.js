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

export const login = async(req, res) => {
    const {email, password} = req.body;
    try {
        if(!email || !password) {
       return res.status(400).send("fill all the fields");
    }
    const user = await User.findOne({email});
    if(!user) {
      return  res.status(400).send("this user is not signed in");
    }
    else {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("Invalid password, password doesn't match.");
        }
        else {
            generateToken(user._id, res);
            res.status(200).json({
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                profilepic: user.profilepic, // Assuming you have a profile picture field
            });
            console.log("login successfull");
            // console.log(req.cookies);
            
        }
    }
    }
    catch(error) {
        console.log("something happened in login");
        res.status(400).send("login error");
        console.log(error.message);
       }
    
}

export const logout = async(req, res) => {
   try {
    res.clearCookie('jwt',"", {maxAge: 0});
    res.status(400).json({message: "logout successfull"})
   }
   catch (error) {
    console.log("Error during logout:");
    console.log(error.message);
    
    res.status(500).send("Logout error.");
  }
}

export const updateprofile = async(req, res) => {
  try {

  }
  catch(error) {
    console.log("error happended in the update profile");
    res.status()
  }
}