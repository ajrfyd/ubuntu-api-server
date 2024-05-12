import jwt, { JwtPayload } from "jsonwebtoken";
import { type MiddlewareFnType } from "../types/common.js";
import { UserRole, DecodedUser } from "../types/user.js";

export const cookieChecker: MiddlewareFnType = async (req, res, next) => {
  const { failRes } = req;
  const { jwt: token } = req.signedCookies;

  if (!token) return failRes(403, "토큰이 유효하지 않거나 권한이 없습니다.");
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
  if (!decoded) return failRes(401, "잘못된 인증 정보 입니다.");
  // console.log(decoded, "<<<<<decoded", typeof decoded);
  req.decodedUserInfo = {
    ...(decoded as DecodedUser),
  };

  next();
};
