import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";

import authrouter from "./src/routes/auth.route.js";
import messagerouter from "./src/routes/message.route.js";
import { app, server } from "./src/lib/socket.js";

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

/* ================= Health check ================= */
app.get("/health", (_, res) => {
  res.status(200).send("OK");
});

/* ================= API routes ================= */
app.use("/api/auth", authrouter);
app.use("/api/message", messagerouter);

/* ================= Serve frontend ================= */
const rootDir = path.resolve();
app.use(express.static(path.join(rootDir, "frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(rootDir, "frontend/dist/index.html"));
});

/* ================= START SERVER (CRITICAL) ================= */
if (!process.env.PORT) {
  throw new Error("PORT is not defined");
}

server.listen(Number(process.env.PORT), "0.0.0.0", () => {
  console.log("🚀 Listening on port", process.env.PORT);
});

/* ================= MongoDB (NON-BLOCKING) ================= */
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));
