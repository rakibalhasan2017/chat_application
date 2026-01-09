import express from "express"; // ✅ THIS WAS MISSING
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
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

/* ================= API Routes ================= */
app.use("/api/auth", authrouter);
app.use("/api/message", messagerouter);

/* ================= Serve Frontend ================= */
const rootDir = path.resolve();

app.use(express.static(path.join(rootDir, "frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(rootDir, "frontend/dist/index.html"));
});

/* ================= Start Server (CRITICAL) ================= */
if (!process.env.PORT) {
  throw new Error("PORT is not defined");
}

server.listen(Number(process.env.PORT), "0.0.0.0", () => {
  console.log("🚀 Server listening on port", process.env.PORT);
});

/* ================= MongoDB (NON-BLOCKING) ================= */
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));
