import { createMsgData } from "../services/msg.services.js";
import { RQ, RS } from "../types/common.js";

export const createMessage = async (req: RQ, res: RS) => {
  const { needToNewMsg, completeRes, errorRes, failRes } = req;
  const { msg } = req.body;
  try {
    const newMsg = await createMsgData({ ...needToNewMsg, msg });
    completeRes(newMsg);
  } catch (e) {
    errorRes(e as Error);
  }
};
