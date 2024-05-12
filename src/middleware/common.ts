import { type MiddlewareFnType } from "../types/common";

const { log } = console;

export const logger: MiddlewareFnType = (req, res, next) => {
  const { headers, path, signedCookies } = req;
  log(
    `IP: ${headers["x-real-ip"]}\nAgent: ${
      headers["user-agent"]
    }\nReqPath: ${path}
    \nDate: ${new Intl.DateTimeFormat("ko-kr", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date(Date.now()))}`
  );

  next();
};

export const initResponseObj: MiddlewareFnType = (req, res, next) => {
  const resultState = {
    status: 200,
    message: "ok",
    result: null,
  };

  req.resultState = resultState;

  next();
};

export const responseStateMaker: MiddlewareFnType = (req, res, next) => {
  const resultState = {
    status: 200,
    message: "",
    result: "",
  };

  req.resultState = resultState;

  req.completeRes = <T>(result: T, status?: number) => {
    return res.status(status || 200).json({
      ...resultState,
      status: status || 200,
      message: "ok",
      result,
    });
  };

  req.failRes = (statusCode, message) => {
    return res.status(statusCode).json({
      ...resultState,
      status: statusCode,
      message,
      result: null,
    });
  };

  req.errorRes = (e) => {
    res.status(500).json({
      ...resultState,
      status: 500,
      message: `${e.name}: ${e.message}`,
      result: null,
    });
  };

  next();
};
