import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

/* ================= Socket Logic ================= */

const userSocketMap = {}; // userId -> socketId

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("🔌 Socket connected:", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected:", socket.id);
    if (userId) delete userSocketMap[userId];
  });
});

export { io, server, app };
