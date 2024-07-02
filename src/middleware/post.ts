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

export const postBodyChecker: MiddlewareFnType = async (req, res, next) => {
  const { failRes } = req;
  const { title, body, tags } = req.body;
  if (!title || !body || !tags.length) {
    return failRes(400, "본문을 모두 입력해 주세요.");
  }
  next();
};
