import express from 'express';
import post from "./post.js";
import oauth from './oauth.js';
import { oauthUser } from '../../middleware/index.js';

const klogRouter = express.Router();
const routers = [...post, ...oauth];

routers.forEach(({ method, path, handler}) => {
  const order = path.slice(1).split("/")[0];
  if(order === "post") klogRouter[method](`${path}`, oauthUser, handler);
  if(order === "oauth") klogRouter[method](`${path}`, handler);
});


export default klogRouter;