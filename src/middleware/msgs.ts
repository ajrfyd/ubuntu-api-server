import { MiddlewareFnType } from "../types/common";
import jwt from "jsonwebtoken";
import { findOrCreateRoom } from "../services/msg.services.js";
import { DecodedUser } from "../types/user";

export const checkRoom: MiddlewareFnType = async (req, res, next) => {
  const { failRes, verifiedUser } = req;

  try {
    const { id } = verifiedUser;
    const [room, created] = await findOrCreateRoom(id);
    req.needToMsgsData = { roomId: room.roomId, userId: id };

    next();
  } catch (e) {
    if (e instanceof Error) {
      const { message, name } = e;
      failRes(500, message);
      console.log(name, "msgMd ErrorName");
    }
    console.log(e, "<<< msgMd");
  }
};
