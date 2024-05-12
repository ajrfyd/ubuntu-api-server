import { Request, Response, NextFunction } from "express";
import { Err } from "./index.js";

const errorHandler = (
  err: Err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errResponse = {
    status: 500,
    message: "",
    result: null,
  };
  // console.log(err, " Errrrr ");
  // console.log(err.response);

  if (err instanceof TypeError) {
    return res.json({
      ...errResponse,
      message: `${err.name}: ${err.message}`,
      result: "Opps....개발자가 실수를 했네요...",
    });
  }

  res.json({
    ...errResponse,
    status: 0,
    message: `${err.name}: ${err.message}`,
  });
};

export default errorHandler;
