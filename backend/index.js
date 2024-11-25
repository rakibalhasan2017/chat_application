import express from 'express';
import authrouter from './src/routes/auth.route.js'
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

app.use("/api/auth", authrouter);

mongoose.connect(MONGODB_URL)
.then(() => {
    app.listen(PORT, () => {
        console.log(`server is running to ${PORT}`);
        
    })
    console.log('MongoDB connected successfully');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});