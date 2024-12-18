import express from 'express';
import authrouter from './src/routes/auth.route.js'
import messagerouter from './src/routes/message.route.js'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import multer from 'multer';
import {app, server, io} from './src/lib/socket.js';

app.use(cookieParser());
app.use(express.json());
app.use(fileUpload());
dotenv.config();

const corsOptions = {
    origin: 'http://localhost:5173',  // Replace with your frontend URL
    methods: 'GET,POST,PUT,DELETE',  // Allowed methods
    credentials: true,  // Allow cookies
};

app.use(cors(corsOptions));
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

app.use("/api/auth", authrouter);
app.use("/api/message", messagerouter);

mongoose.connect(MONGODB_URL)
.then(() => {
    server.listen(PORT, () => {
        console.log(`server is running to ${PORT}`);
    })
    console.log('MongoDB connected successfully');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});