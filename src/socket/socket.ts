import { Server } from "socket.io";
import http from "http";
import express from "express";

const { log } = console;

export const app = express();
export const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["https://klog.hkound.pe.kr", "http://localhost:5173"],
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  },
});

io.use(async (socket, next) => {
  console.log(socket.handshake.address);
  console.log(socket.handshake.auth);

  next();
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.emit("hello", "Hello world???");
});

export default io;
