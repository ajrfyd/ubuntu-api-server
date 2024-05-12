import express from "express";
import post from "./post.js";
import tags from "./tag.js";
import oauth from "./oauth.js";
import { oauthUser, postCookieChecker } from "../../middleware/index.js";

const klogRouter = express.Router();
const routers = [...post, ...oauth, ...tags];

// Todo 라우팅 처리 다시
routers.forEach(({ method, path, handler }) => {
  const order = path.slice(1).split("/")[0];
  if (order === "post") klogRouter[method](`${path}`, handler);
  if (order === "oauth") klogRouter[method](`${path}`, handler);
  if (order === "tags") klogRouter[method](`${path}`, handler);
});

export default klogRouter;
