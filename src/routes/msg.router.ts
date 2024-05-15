import express from "express";
import { createMessage } from "../controllers/msg.controllers.js";
import { checkRoom } from "../middleware/msgs.js";

const msgRouter = express.Router();

msgRouter.post("/", checkRoom, createMessage);

export default msgRouter;
