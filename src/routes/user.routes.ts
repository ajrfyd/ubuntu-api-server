import express from "express";
import {
  createUser,
  loginUser,
  getUserInfo,
  getUserRole,
  signOutUser,
  checkUser,
  createNickName,
} from "../controllers/user.controllers.js";
import {
  checkUserDuplication,
  checkUserLoginInfo,
  nickNameCheck,
} from "../middleware/user.js";
import { cookieChecker } from "../middleware/auth.js";

const userRouter = express.Router();

// ^ get user info
userRouter.get("/", cookieChecker, getUserInfo);
// ^ create user
userRouter.post("/create", checkUserDuplication, createUser);
userRouter.post("/create/nickname", nickNameCheck, createNickName);
// ^ login user
userRouter.post("/", checkUserLoginInfo, loginUser);
// ^ logout user
userRouter.post("/logout", cookieChecker, signOutUser);
// ^ check user role
userRouter.get("/role", cookieChecker, getUserRole);
// ^ check user with cookie
userRouter.get("/check", cookieChecker, checkUser);

export default userRouter;
