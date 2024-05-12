import { Request, Response, NextFunction } from "express";

export type RQ = Request & {};
export type RS = Response & {};

export type EnumType = "A" | "B";

export type RouteType = {
  method: "get" | "post" | "put" | "patch" | "delete";
  path: string;
  handler: (req: Request, res: Response) => void;
};

export type BaseResponseType<T> = {
  status: number;
  message: string;
  result: T | null;
};

export type MiddlewareFnType = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type ControllerFnType = <T>(req: Request, res: Response) => Partial<T>;
