import {
  createMsgData,
  getMessagesData,
  getRoomsData,
  getMessagesByRoomIdData,
  createMsgByRoomIdData,
} from "../services/msg.services.js";
import { RQ, RS } from "../types/common.js";
import io, { getSocketId } from "../socket/socket.js";

export const getMessages = async (req: RQ, res: RS) => {
  const { completeRes, errorRes, needToMsgsData } = req;
  const { roomId, userId } = needToMsgsData;

  try {
    const result = await getMessagesData(roomId);
    completeRes(result);
  } catch (e) {
    errorRes(e as Error);
  }
};

export const createMessage = async (req: RQ, res: RS) => {
  const { needToMsgsData, completeRes, errorRes, fromTo } = req;
  const { msg } = req.body;

  try {
    const newMsg = await createMsgData({ ...needToMsgsData, msg });
    io.to(getSocketId(fromTo.to)).emit("onlineMsg", newMsg);

    completeRes(newMsg);
  } catch (e) {
    errorRes(e as Error);
  }
};

export const getRooms = async (req: RQ, res: RS) => {
  const { completeRes, errorRes, verifiedUser, failRes } = req;
  const { role } = verifiedUser;
  if (role !== "admin") return failRes(403, "권한이 없습니다.");

  try {
    const result = await getRoomsData();
    // io.to().emit();

    completeRes(result);
  } catch (e) {
    errorRes(e as Error);
  }
};

export const getMessagesByRoomId = async (req: RQ, res: RS) => {
  const { errorRes, completeRes } = req;
  const { id } = req.params;

  try {
    const result = await getMessagesByRoomIdData(id);
    completeRes(result);
  } catch (e) {
    errorRes(e as Error);
  }
};

export const createMessageByRoomId = async (req: RQ, res: RS) => {
  const { completeRes, errorRes, verifiedUser, fromTo } = req;
  const { id: roomId } = req.params;
  const { msg } = req.body;

  try {
    const result = await createMsgByRoomIdData({
      roomId,
      createUserId: verifiedUser.id,
      msg,
    });

    io.to(getSocketId(fromTo.to)).emit("onlineMsg", result);

    completeRes(result);
  } catch (e) {
    errorRes(e as Error);
  }
};
