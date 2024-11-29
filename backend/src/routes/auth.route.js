import express from 'express';
import { signup, login, logout } from '../controller/auth.controller.js';
import { protectedroute } from '../middlewear/protectedroute.js'

const router = express.Router();

router.post("/signup", signup)

router.post("/login", login);

router.post("/logout", logout)

 router.put("/updateprofile", protectedroute,  updateprofile);

export default router