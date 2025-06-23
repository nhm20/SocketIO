import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

io.on("connection", (socket) => {
  console.log("✅ New user connected:", socket.id);

  socket.on("custom-event", (num, str, obj) => {
    console.log("📩 Custom Event:", num, str, obj);
  });

  socket.on("send-message", ({ message, room }) => {
    if (room) {
      socket.to(room).emit("receive-message", message);
      console.log(`📨 Room ${room}: ${message}`);
    } else {
      socket.broadcast.emit("receive-message", message);
      console.log(`📨 Broadcast from ${socket.id}: ${message}`);
    }
  });

  socket.on("join-room", (room) => {
    socket.join(room);
    console.log(`🔗 ${socket.id} joined room: ${room}`);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("🚀 Socket.IO server running on http://localhost:3000");
});    