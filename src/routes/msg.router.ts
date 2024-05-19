import express from "express";
import { cookieChecker } from "../middleware/auth.js";
import {
  createMessage,
  getMessages,
  getRooms,
  getMessagesByRoomId,
  createMessageByRoomId,
} from "../controllers/msg.controllers.js";
import { checkRoom, getFromTo } from "../middleware/msgs.js";

const msgRouter = express.Router();

// 모든 메세지
msgRouter.get("/", checkRoom, getMessages);
// isAdmin >> roomList
msgRouter.get("/room", getRooms);
// 메세지 작성
msgRouter.post("/", checkRoom, getFromTo, createMessage);
// isAdmin >> room별 msgList
msgRouter.get("/:id", checkRoom, getMessagesByRoomId);
// isAdmin >> sendMsg to RoomId
msgRouter.post("/room/:id", checkRoom, getFromTo, createMessageByRoomId);

export default msgRouter;
