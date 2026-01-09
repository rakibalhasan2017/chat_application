import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
  }

const userSocketMap = {}; // Store user id and socket id

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  const userId = socket.handshake.query.userId;
  console.log("socket details in the socket js", socket);
  if (userId) userSocketMap[userId] = socket.id;
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

export { io, server, app };
