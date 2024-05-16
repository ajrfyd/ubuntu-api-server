import { Op } from "sequelize";
import { v4 } from "uuid";
import db from "../db/models/index.js";

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

export const getMessagesData = async (userId: string, roomId: string) => {
  const result = await db.Msg.findAll({
    where: { createUserId: userId, roomId },
    raw: true,
  });
  return result;
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

export const getRoomsData = async () =>
  await db.Room.findAll({ where: { deletedAt: { [Op.is]: null } } });

export const getMessagesByRoomIdData = async (roomId: string) =>
  await db.Msg.findAll({ where: { roomId }, raw: true });

type CreateMsgByRoomIdProps = {
  msg: string;
  roomId: string;
  createUserId: string;
};
export const createMsgByRoomIdData = async ({
  msg,
  roomId,
  createUserId,
}: CreateMsgByRoomIdProps) => {
  const result = await db.Msg.create({
    msgType: "B",
    msg: msg,
    contactIp: "",
    msgState: "B",
    createUserId: createUserId,
    roomId: roomId,
  });

  return result.dataValues;
};
