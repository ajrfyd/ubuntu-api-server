import express from "express";
import { cookieChecker } from "../middleware/auth.js";
import {
  createMessage,
  getMessages,
  getRooms,
  getMessagesByRoomId,
  createMessageByRoomId,
} from "../controllers/msg.controllers.js";
import { checkRoom } from "../middleware/msgs.js";

const msgRouter = express.Router();

msgRouter.get("/", checkRoom, getMessages);
msgRouter.get("/room", getRooms);
msgRouter.post("/", checkRoom, createMessage);
msgRouter.get("/:id", checkRoom, getMessagesByRoomId);
msgRouter.post("/room/:id", checkRoom, createMessageByRoomId);

export default msgRouter;
