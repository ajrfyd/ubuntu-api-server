import { Server, Socket } from "socket.io";
import http from "http";
import express from "express";
import {
  changStateMsg,
  msgChageStateHandler,
} from "../services/msg.services.js";
import ck from "cookie";
import jwt, { JwtPayload } from "jsonwebtoken";
import cookieParser, { signedCookie } from "cookie-parser";
import cookie from "cookie";
import { type DecodedUser } from "../types/user.js";
import { decodeUser } from "../utils/utils.js";
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
  const { cookie: cks } = socket.handshake.headers;
  const parsedCks = cookie.parse(cks as string);

  const sigendCookie = cookieParser.signedCookies(
    parsedCks,
    process.env.COOKIE_SECRET
  );

  const token = sigendCookie["jwt"];

  if (token) {
    try {
      // const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const decoded = decodeUser(token);
      const roomInfo = await getRoomDataByUserId(decoded.userId);

      userSocketMap[socket.id] = decoded.userId;
      socket.emit("decodedUser", { ...decoded, roomId: roomInfo.roomId });
      return next();
    } catch (e) {
      console.error("JWT verification failed:", e);
      if (e instanceof jwt.JsonWebTokenError) {
        console.error("JWT Error details:", e.name, e.message);
        console.error("Received token:", token);
      }
      next(new Error("Authentication error"));
    }
  } else {
    const unknownUser = `unknown-${Date.now()}`;
    userSocketMap[socket.id] = unknownUser;
    socket.emit("unknownUser", unknownUser);
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

        socket.emit("zzz", "zzzz");
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
