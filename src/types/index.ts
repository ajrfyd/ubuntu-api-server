import { NextFunction, Request, Response } from "express";

export * from "./post.js";

export type RouteType = {
  method: "get" | "post" | "put" | "patch" | "delete";
  path: string;
  handler: (req: Request, res: Response) => void;
};

export type InitResponseType<T> = {
  status: number;
  message: string;
  result: T | null;
};

export type MiddleWareFnType = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
