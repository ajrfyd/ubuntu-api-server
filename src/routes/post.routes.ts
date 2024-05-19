import express from "express";
import {
  getPosts,
  getPostById,
  writePost,
  updatePost,
  getTags,
  getPostsByTagId,
} from "../controllers/post.controllers.js";
import { cookieChecker } from "../middleware/auth.js";
const postRouter = express.Router();

// 모든 포스트
postRouter.get("/posts", getPosts);
// 단일 포스트
postRouter.get("/post/:id", getPostById);

//Todo
postRouter.get("/tag/:id", getPostsByTagId);
// 포스트 작성
postRouter.post("/write", cookieChecker, writePost);
// 포스트 수정
postRouter.post("/post/:id", updatePost);

postRouter.get("/tags", getTags);

export default postRouter;
