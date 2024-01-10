import { Request, Response } from "express";
import klogRouter from "./klog/index.js";

const router = {
  klog: klogRouter,
};

export default router;