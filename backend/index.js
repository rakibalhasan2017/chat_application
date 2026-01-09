import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import path from "path";

import authrouter from "./src/routes/auth.route.js";
import messagerouter from "./src/routes/message.route.js";
import { app, server } from "./src/lib/socket.js";

dotenv.config();

/* ================= Middleware ================= */
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);

/* ================= Routes ================= */
app.use("/api/auth", authrouter);
app.use("/api/message", messagerouter);

/* ================= Serve Frontend ================= */
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist/index.html"));
});

/* ================= Database & Server ================= */
const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL;

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
