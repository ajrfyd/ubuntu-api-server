import { MiddlewareFnType } from "../types/common";
import jwt from "jsonwebtoken";
import {
  findOrCreateRoom,
  getRoomDataByRoomId,
  getAdminRoomId,
} from "../services/msg.services.js";
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

// Todo 범용성 있게 고치자
export const getFromTo: MiddlewareFnType = async (req, res, next) => {
  const { errorRes, verifiedUser } = req;
  const { id } = verifiedUser;
  let { id: roomId } = req.params;

  try {
    if (!roomId) {
      const [admin] = await getAdminRoomId();
      roomId = admin.roomId;
    }

    const room = await getRoomDataByRoomId(roomId);

    req.fromTo = {
      to: room.createUserId,
      from: id,
      roomId: room.roomId,
    };
    next();
  } catch (e) {
    errorRes(e as Error);
  }
};
