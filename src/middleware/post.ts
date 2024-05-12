import db from "../db/models/index.js";
import { MiddlewareFnType } from "../types/common.js";
import { TagType } from "../types/post.js";

export const getAllTags: MiddlewareFnType = async (req, res, next) => {
  try {
    const tags: TagType[] = await db.Tag.findAll({ raw: true });
    const all = tags.filter((tag) => tag.label === "All");

    req.tags = [...all, ...tags.filter((tag) => tag.label !== "All")];
    next();
  } catch (e) {
    next(e);
  }
};
