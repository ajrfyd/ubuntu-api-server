import { Request, Response, NextFunction } from "express";
import db from "../models/index.js";
import { log } from "../utils/index.js";
import { TagType } from "../types/klog.js";

export const initResponseObj = (req: Request, res: Response, next: NextFunction) => {
  const resultState = {
    status: 200,
    message: "ok",
    result: null
  };

  req.resultState = resultState;
  
  next();
};

export const getAllTags = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const tags: TagType[] = await db.Tag.findAll({ raw: true });
    const all = tags.filter(tag => tag.label === "All");

    req.tags = [...all, ...tags.filter(tag => tag.label !== "All")];
    next();
  } catch(e) {
    next(e);
  }
};