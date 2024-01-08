import { Request, Response, NextFunction } from "express";
import { log } from "../utils/index.js";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const { headers } = req;
  log(`IP: ${headers["x-real-ip"]}\nAgent: ${headers["user-agent"]}`);
  next();
};