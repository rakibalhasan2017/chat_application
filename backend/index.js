import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { app, server } from "./src/lib/socket.js";

dotenv.config();

console.log("🔥 index.js loaded");

/* ================= ABSOLUTE MINIMAL ROUTE ================= */
app.get("/", (req, res) => {
  console.log("✅ Railway hit /");
  res.status(200).send("HELLO FROM RAILWAY");
});

/* ================= START SERVER ================= */
if (!process.env.PORT) {
  console.error("❌ PORT not defined");
  process.exit(1);
}

server.listen(Number(process.env.PORT), "0.0.0.0", () => {
  console.log("🚀 Listening on", process.env.PORT);
});

/* ================= MongoDB (optional, non-blocking) ================= */
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));
