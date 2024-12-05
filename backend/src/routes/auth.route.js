import express from 'express';
import { signup, login, logout, updateprofile } from '../controller/auth.controller.js';
import { protectedroute } from '../middlewear/protectedroute.js'

const router = express.Router();

router.post("/signup", signup)

router.post("/login", login);

router.post("/logout", logout)

 router.put("/updateprofile", protectedroute,  updateprofile);
 
 router.get('/check', protectedroute, (req, res) => {
    res.status(200).send("Authenticated");
  });
 

export default router