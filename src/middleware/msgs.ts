import { MiddlewareFnType } from "../types/common";
import jwt from "jsonwebtoken";
import { findOrCreateRoom } from "../services/msg.services.js";
import { DecodedUser } from "../types/user";

export const checkRoom: MiddlewareFnType = async (req, res, next) => {
  const { failRes, signedCookies } = req;
  try {
    const { jwt: token } = signedCookies;
    if (!token) return failRes(403, "토큰이 유효하지 않거나 권한이 없습니다.");
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded) return failRes(401, "잘못된 인증 정보 입니다.");

    const { userId } = decoded as DecodedUser;
    const [room, created] = await findOrCreateRoom(userId);
    req.needToNewMsg = { roomId: room.roomId, userId };

    next();
  } catch (e) {
    if (e instanceof Error) {
      const { message, name } = e;
      if (name === "TokenExpiredError")
        return failRes(401, "토큰이 만료되었습니다.");
      if (name === "JsonWebTokenError") return failRes(400, message);
    }
  }
};
