import jwt from "jsonwebtoken";
import { type MiddlewareFnType } from "../types/common.js";
import { UserRole, DecodedUser } from "../types/user.js";
import { getUserData } from "../services/user.services.js";

export const cookieChecker: MiddlewareFnType = async (req, res, next) => {
  const { failRes } = req;

  try {
    const { jwt: token } = req.signedCookies;
    if (!token && req.baseUrl + req.path === "/user/check") {
      req.hasCookie = false;
      return next();
    }
    if (!token) return failRes(403, "토큰이 유효하지 않거나 권한이 없습니다.");
    // console.log(token, "tokenenenneen");
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded) return failRes(401, "잘못된 인증 정보 입니다.");
    // console.log(decoded, "<<<<<decoded", typeof decoded);
    req.hasCookie = true;
    const { nickName, userId } = decoded as DecodedUser;
    const userData = await getUserData(nickName, userId);
    if (!userData)
      return failRes(400, "비정상적 접근입니다.(쿠키가 조작되었음.)");

    req.verifiedUser = {
      id: userData.id,
      nickName: userData.nickName,
      role: userData.role,
    };

    req.decodedUserInfo = {
      ...(decoded as DecodedUser),
    };

    next();
  } catch (e) {
    if (e instanceof Error) {
      const { message, name } = e;
      if (name === "TokenExpiredError")
        return failRes(401, "토큰이 만료되었습니다.");
      if (name === "JsonWebTokenError") return failRes(400, message);
    }
    console.log(e, "Auth Middleware");
  }
};
