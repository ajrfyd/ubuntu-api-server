import express from "express";
import {
  getPosts,
  getPostById,
  writePost,
  updatePost,
  getTags,
  getPostsByTagId,
  getPostsByTagId2,
} from "../controllers/post.controllers.js";
import { cookieChecker } from "../middleware/auth.js";
import { postBodyChecker } from "../middleware/post.js";
const postRouter = express.Router();

postRouter.get("/", getPostsByTagId2);

// 모든 포스트
postRouter.get("/posts", getPosts);
// 단일 포스트
postRouter.get("/post/:id", getPostById);

//Todo
postRouter.get("/tag/:id", getPostsByTagId);
// 포스트 작성
postRouter.post("/write", cookieChecker, postBodyChecker, writePost);
// 포스트 수정
postRouter.post("/post/:id", cookieChecker, postBodyChecker, updatePost);

postRouter.get("/tags", getTags);

// postRouter.get("/tagId", getPostsByTagId2);

export default postRouter;
