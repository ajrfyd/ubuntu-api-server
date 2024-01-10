import { Request, Response, NextFunction } from "express";
import { InitResponseType } from "../types";

export const initResponseObj = (req: Request, res: Response, next: NextFunction) => {
  const resultState = {
    status: 200,
    message: "ok",
    result: null
  };

  req.resultState = resultState;
  
  next();
};