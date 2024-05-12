import express from "express";
import {
  createUser,
  loginUser,
  getUserInfo,
} from "../controllers/user.controllers.js";
import {
  checkUserDuplication,
  checkUserLoginInfo,
} from "../middleware/user.js";
import { cookieChecker } from "../middleware/auth.js";

const userRouter = express.Router();

// ^ get user info
userRouter.get("/", cookieChecker, getUserInfo);
// ^ create user
userRouter.post("/create", checkUserDuplication, createUser);
// ^ login user
userRouter.post("/", checkUserLoginInfo, loginUser);

export default userRouter;
