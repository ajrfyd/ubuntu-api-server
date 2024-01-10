import express from 'express';
import post from "./post.js";
import { RouteType } from "../../types/index.js";

const klogRouter = express.Router();
const routers = [...post];

routers.forEach(({ method, path, handler}) => {
  klogRouter[method](`${path}`, handler);
});


export default klogRouter;