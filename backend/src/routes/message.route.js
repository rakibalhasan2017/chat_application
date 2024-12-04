import express from 'express';
import {getalluser, getallmessage, sendmessage} from '../controller/message.controller.js';
import { protectedroute } from '../middlewear/protectedroute.js'

const router = express.Router();

router.get("/users", protectedroute,  getalluser);
router.get("/:id", protectedroute,  getallmessage);
router.post("/send/:id", protectedroute,  sendmessage);

export default router

