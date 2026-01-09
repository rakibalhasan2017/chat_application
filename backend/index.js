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
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

/* ================= Health Check ================= */
app.get("/health", (_, res) => res.status(200).send("OK"));

/* ================= API Routes ================= */
app.use("/api/auth", authrouter);
app.use("/api/message", messagerouter);

/* ================= Serve Frontend ================= */
const rootDir = path.resolve("..");
const frontendPath = path.join(rootDir, "frontend/dist");

app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

/* ================= Start Server ================= */
server.listen(Number(process.env.PORT), "0.0.0.0", () => {
  console.log("🚀 Server listening on port", process.env.PORT);
});

/* ================= MongoDB ================= */
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(console.error);
