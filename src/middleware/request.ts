import { Request, Response, NextFunction } from "express";
import db from "../db/models/index.js";
import { log } from "../utils/index.js";
import { type MiddleWareFnType } from "../types/index.js";
import { type TagType, type PostType } from "../types/post.js";
import { getMaxAgeTime } from "../utils/utils.js";

export const initResponseObj = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const resultState = {
    status: 200,
    message: "ok",
    result: null,
  };

  req.resultState = resultState;

  next();
};

export const getAllTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tags: TagType[] = await db.Tag.findAll({ raw: true });
    const all = tags.filter((tag) => tag.label === "All");

    req.tags = [...all, ...tags.filter((tag) => tag.label !== "All")];
    next();
  } catch (e) {
    next(e);
  }
};

export const postCookieChecker: MiddleWareFnType = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next();
  console.log(id, "<<<<<<<<<<<ID");
  const hasTag = req.path
    .split("/")
    .filter((str) => str !== "")
    .includes("tag");
  if (hasTag) return next();
  console.log(req.signedCookies[id]);
  const visitDate = req.signedCookies[id] as string;
  console.log(visitDate, "<<<<<<visitdate");
  // if (!visitDate) {
  //   const [h, m] = getMaxAgeTime(new Date());
  //   res.cookie(id, new Date(), {
  //     httpOnly: true,
  //     sameSite: "strict",
  //     secure: process.env.NODE_ENV === "production",
  //     maxAge: h * m * 60 * 1000,
  //     signed: true,
  //     path: "/klog/post",
  //   });

  //   console.log(hasTag, "<<<<<<<<<< here");

  //   const post: Pick<PostType, "view_cnt"> = await db.Post.findOne({
  //     attributes: ["view_cnt"],
  //     where: { id },
  //     raw: true,
  //   });

  //   console.log(id, post, "DASDASDSasdalsfnlask");
  //   await db.Post.update(
  //     { view_cnt: (post.view_cnt as number) + 1 },
  //     { where: { id } }
  //   );
  // }

  // req.isVisit = visitDate ? true : false;
  next();
};
