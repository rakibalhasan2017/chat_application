import express from 'express';
import { signup, login, logout, updateprofile, getuser } from '../controller/auth.controller.js';
import { protectedroute } from '../middlewear/protectedroute.js'
import cloudinary from '../lib/cloudinary.js'

const router = express.Router();

router.post("/signup", signup)

router.post("/login", login);

router.post("/logout", logout)

 router.put("/updateprofile", protectedroute,   updateprofile);
 
 router.get("/user", protectedroute, getuser);
 

export default router