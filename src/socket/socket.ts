import { Server, Socket } from "socket.io";
import http from "http";
import express from "express";
import {
  changStateMsg,
  msgChageStateHandler,
} from "../services/msg.services.js";
// import ck from "cookie";
import jwt, { JwtPayload } from "jsonwebtoken";
import cookieParser, { signedCookie } from "cookie-parser";
import cookie from "cookie";
import { type DecodedUser } from "../types/user.js";
import { decodeUser, parseCookieHandler } from "../utils/utils.js";
import { getRoomDataByUserId } from "../services/msg.services.js";

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

export const userSocketMap: Record<string, string> = {};

io.use(async (socket, next) => {
  // ^ cookie 확인
  // ^ 쿠키가 있는 경우 쿠키 정보를 파싱해서 리턴
  // ^ 쿠키가 없는 경우 unknownUser 리턴
  const unknownUserHandler = () => {
    const unknownUser = `unknown-${Date.now()}`;
    userSocketMap[socket.id] = unknownUser;
    socket.emit("unknownUser", unknownUser);
  };
  try {
    const { cookie } = socket.handshake.headers;
    // console.log(cks, "<<<<cks");
    if (cookie) {
      const token = parseCookieHandler(cookie, "jwt") as string;

      if (!token) return unknownUserHandler();

      const decoded = decodeUser(token);
      const roomInfo = await getRoomDataByUserId(decoded.userId);

      userSocketMap[socket.id] = decoded.userId;
      socket.emit("decodedUser", { ...decoded, roomId: roomInfo.roomId });
      return next();
    } else {
      unknownUserHandler();
    }
  } catch (e) {
    console.error("JWT verification failed:", e);
    if (e instanceof jwt.JsonWebTokenError) {
      console.error("JWT Error details:", e.name, e.message);
      // console.error("Received token:", token);
    }
    next(new Error("Authentication error"));
  }
  next();
});

io.on("connection", (socket) => {
  const { id } = socket.handshake.auth;
  const { nickName } = socket.handshake.auth;

  if (socket.connected) {
    // if (id) userSocketMap[id] = socket.id;
    // userSocketMap[socket.id] = "roomId";
    console.log(userSocketMap, "socket Connection");

    socket.emit("connected", "Socket connection successful!");
    socket.emit("onlineUser", userSocketMap);

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

  socket.on("viewControll", async (viewInfo) => {
    const { id, roomId, role } = viewInfo;
    const result = await msgChageStateHandler(id, roomId, role);
    // console.log(result);
  });

  socket.on("disconnect", (reason) => {
    console.log(`${socket.id} disconneced! because ${reason}`);
    delete userSocketMap[socket.id];
    socket.emit("leaveUser", userSocketMap);
  });
});

export default io;
