import { Request, Response, NextFunction } from "express";
import { getToken } from "../utils/utilsTs.js";
import { getUserInfoInstance } from "../axiosInstance/index.js";
import { UserInfoType } from "../types/klog.js";

export const oauthUser = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if(!authorization) return next();
  const { OAUTH_GIT_ADMIN_ID } = process.env;
  const [type, token] = getToken(authorization);

  try {
    const { data } = await getUserInfoInstance.get<UserInfoType>("", {
      headers: {
        Authorization: `${type} ${token}`
      }
    });

    req.isAdmin = (data.login === "ajrfyd") && (data.id === Number(OAUTH_GIT_ADMIN_ID));
    next();
  } catch(e) {
    next(e);
  }
};
