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

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.emit("connected", { message: "You are connected to the server!" });

socket.on("disconnect", () => {
   console.log("User disconnected", socket.id);
  });

});

export { io, server, app };
