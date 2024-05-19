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

export const getMessagesData = async (roomId: string) => {
  const result = await db.Msg.findAll({
    where: { roomId },
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

// export const getRoomsData = async () =>
// await db.Room.findAll({ where: { deletedAt: { [Op.is]: null } } });

export const getRoomsData = async () => {
  const query = `
    SELECT
      U.nickName,
      R.*
    FROM User as U
    LEFT JOIN Room as R
    on U.id = R.createUserId
    WHERE U.deletedAt IS NULL 
    AND NOT U.role = 'admin';
  `;
  return await db.sequelize.query(query, {
    raw: true,
    type: db.sequelize.QueryTypes.SELECT,
  });
};

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

export const getRoomDataByRoomId = async (roomId: string) => {
  const result = await db.Room.findOne({
    where: { roomId, deletedAt: { [Op.is]: null } },
    raw: true,
  });
  return result;
};

export const getRoomDataByUserId = async (userId: string) => {
  const result = await db.Room.findOne({
    where: { createUserId: userId, deletedAt: { [Op.is]: null } },
    raw: true,
  });

  return result;
};

export const getAdminRoomId = async () => {
  const query = `
    SELECT 
      R.roomId
    FROM User as U
    JOIN Room AS R
    ON U.id = R.createUserId
    WHERE U.role = "admin" AND U.deletedAt IS NULL;
  `;
  return await db.sequelize.query(query, {
    raw: true,
    type: db.sequelize.QueryTypes.SELECT,
  });
};

type ChangeState = {
  type?: "msgType" | "msgState";
  value: "A" | "B";
  createUserId: string;
  roomId: string;
};
export const changStateMsg = async ({
  type = "msgState",
  value,
  createUserId,
  roomId,
}: ChangeState) => {
  const result = await db.Msg.update(
    { [type]: value },
    {
      where: { [type]: "B", createUserId: { [Op.not]: createUserId }, roomId },
      raw: true,
    }
  );

  console.log(result);
  return result;
};
