import { Request, Response } from "express";

export * from "./klog.js";


export type RouteType = {
  method: "get" | "post" | "put" | "patch" | "delete";
  path: string;
  handler: (req: Request, res: Response) => void;
};

export type InitResponseType<T> = {
  status: number;
  message: string;
  result: T | null
};
