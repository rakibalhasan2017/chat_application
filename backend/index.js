

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

/* ================= BOOT LOG ================= */
console.log("🔥 index.js loaded");

dotenv.config();

/* ================= EARLY HEALTH RESPONSE (CRITICAL) ================= */
// Railway MUST get a response here
app.get("/", (req, res) => {
  console.log("✅ Railway hit /");
  res.status(200).send("ALIVE");
});

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

/* ================= Health Check ================= */
app.get("/health", (req, res) => {
  console.log("✅ Railway hit /health");
  res.status(200).send("OK");
});

/* ================= API Routes ================= */
app.use("/api/auth", authrouter);
app.use("/api/message", messagerouter);

/* ================= Serve Frontend ================= */
const rootDir = path.resolve("..");
const frontendPath = path.join(rootDir, "frontend/dist");

console.log("📁 Frontend path:", frontendPath);

app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  console.log("🌐 SPA fallback:", req.originalUrl);
  res.sendFile(path.join(frontendPath, "index.html"));
});

/* ================= START SERVER FIRST ================= */
console.log("⏱ Starting HTTP server...");

if (!process.env.PORT) {
  console.error("❌ PORT is NOT defined");
  process.exit(1);
}

server.listen(Number(process.env.PORT), "0.0.0.0", () => {
  console.log("🚀 Server listening on port", process.env.PORT);
});

/* ================= CONNECT TO MONGODB (NON-BLOCKING) ================= */
console.log("⏱ Connecting to MongoDB...");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
