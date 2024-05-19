import { Server } from "socket.io";
import http from "http";
import express from "express";
import { changStateMsg } from "../services/msg.services.js";

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

const userSocketMap: Record<string, string> = {};

export const getSocketId = (id: string): string => userSocketMap[id];

// io.use(async (socket, next) => {
//   next();
// });

io.on("connection", (socket) => {
  const { id } = socket.handshake.auth;
  if (socket.connected) {
    if (id) userSocketMap[id] = socket.id;
    console.log(socket.handshake.address);
    // console.log(`${socket.handshake.auth.id} connected!`);
    socket.emit("connected", "Socket connection successful!");
    socket.emit("onlineUser", userSocketMap);

    socket.on("tsts", console.log);

    socket.on(
      "readMsgs",
      async (msgInfo: { createUserId: string; roomId: string }) => {
        await changStateMsg({
          value: "A",
          createUserId: msgInfo.createUserId,
          roomId: msgInfo.roomId,
        });
      }
    );
  }

  socket.on("disconnect", (reason) => {
    console.log(`${socket.id} disconneced! because ${reason}`);
    delete userSocketMap[id];
    socket.emit("leaveUser", userSocketMap);
  });
  console.log(userSocketMap);
});

export default io;
