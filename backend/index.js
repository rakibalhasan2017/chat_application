import express from 'express';
import authrouter from './src/routes/auth.route.js'

const app = express();

app.use("/api/auth", authrouter);

app.listen(5000, () => {
    console.log(`server is running to port`);
    
})