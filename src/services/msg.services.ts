import db from "../db/models/index.js";
import { v4 } from "uuid";

export const findOrCreateRoom = async (userId: string) => {
  const result = await db.Room.findOrCreate({
    where: { createUserId: userId },
    defaults: {
      roomId: `R-${v4()}`,
      imgUrl: "",
      currentState: "B",
      createUserId: userId,
    },
    raw: true,
  });
  return result;
};

type msgParams = {
  userId: string;
  roomId: string;
  msg: string;
};

export const createMsgData = async (param: msgParams) => {
  const result = await db.Msg.create(
    {
      msgType: "B",
      msg: param.msg,
      contactIp: "",
      msgState: "B",
      createUserId: param.userId,
      roomId: param.roomId,
    },
    { raw: true }
  );
  return result.dataValues;
};
