import { RQ, RS } from "../types/common.js";
import {
  createUserData,
  getUserDataByNickName,
  getUserDataFromCookie,
} from "../services/user.services.js";
import { getRoomDataByUserId } from "../services/msg.services.js";
import { hashPassword, generateToken, compared } from "../utils/utils.js";
import { findOrCreateRoom } from "../services/msg.services.js";
import { userSocketMap } from "../socket/socket.js";

export const createUser = async (req: RQ, res: RS) => {
  const { completeRes, failRes, errorRes, body } = req;
  const { nickName, password } = body;

  try {
    const hashedPwd = await hashPassword(password);
    const newUser = await createUserData({ nickName, password: hashedPwd });
    const room = await findOrCreateRoom(newUser.id);
    const token = generateToken(
      newUser.nickName,
      newUser.role,
      newUser.id,
      room.roomId
    );

    res.cookie("jwt", token, {
      maxAge: 24 * 60 * 60 * 1000, // MS
      httpOnly: true, // prevent XSS attacks cross-site scripting attacks
      sameSite: "lax", // CSRF attacks cross-site request forgery attacks
      secure: process.env.NODE_ENV !== "development",
      signed: true,
    });

    completeRes({ ...newUser, password: null, token }, 201);
  } catch (e) {
    errorRes(e as Error);
  }
};

export const loginUser = async (req: RQ, res: RS) => {
  const { completeRes, failRes, errorRes, body } = req;
  const { nickName, password } = body;
  const socketId = req.headers["x-socket-id"];
  if (!socketId) return failRes(500, "Socket연결이 되었나요??");

  try {
    const user = await getUserDataByNickName(nickName);
    if (!user) return failRes(401, "존재하지 않는 닉네임 입니다.");
    const comparedPwd = await compared(password, user.password);
    if (!comparedPwd) return failRes(401, "비밀번호를 다시 확인해 주세요.");
    const roomInfo = await getRoomDataByUserId(user.id);

    const token = generateToken(
      user.nickName,
      user.role,
      user.id,
      roomInfo.roomId
    );

    userSocketMap[socketId as string] = user.id;

    res.cookie("jwt", token, {
      maxAge: 24 * 60 * 60 * 1000, // MS
      httpOnly: true, // prevent XSS attacks cross-site scripting attacks
      sameSite: "lax", // CSRF attacks cross-site request forgery attacks
      // sameSite: "none",
      secure: process.env.NODE_ENV !== "development",
      signed: true,
    });

    const room = await getRoomDataByUserId(user.id);

    completeRes({
      token,
      nickName: user.nickName,
      role: user.role,
      id: user.id,
      roomId: room.roomId,
    });
  } catch (e) {
    errorRes(e as Error);
  }
};

export const getUserInfo = async (req: RQ, res: RS) => {
  const { errorRes, completeRes, decodedUserInfo, failRes } = req;
  try {
    const user = await getUserDataFromCookie(
      decodedUserInfo.nickName,
      decodedUserInfo.role
    );
    const room = await getRoomDataByUserId(user.id);
    const role = user.role === decodedUserInfo.role;
    const nickName = user.nickName === decodedUserInfo.nickName;
    if (!role || !nickName) return failRes(401, "비정상적인 접근 입니다.");
    completeRes({
      nickName: user.nickName,
      role: user.role,
      id: user.id,
      roomId: room.roomId,
    });
  } catch (e) {
    errorRes(e as Error);
  }
};

export const signOutUser = async (req: RQ, res: RS) => {
  const { errorRes, completeRes } = req;

  try {
    res.cookie("jwt", "", {
      maxAge: -1, // MS
      httpOnly: true, // prevent XSS attacks cross-site scripting attacks
      sameSite: "lax", // CSRF attacks cross-site request forgery attacks
      // sameSite: "none",
      secure: process.env.NODE_ENV !== "development",
      signed: true,
    });
    completeRes(null);
  } catch (e) {
    errorRes(e as Error);
  }
};

export const getUserRole = async (req: RQ, res: RS) => {
  const { completeRes, errorRes, verifiedUser } = req;
  try {
    completeRes({ role: verifiedUser.role });
  } catch (e) {
    errorRes(e as Error);
  }
};

export const checkUser = async (req: RQ, res: RS) => {
  const { completeRes, errorRes, hasCookie } = req;
  if (!hasCookie) return completeRes(null);
  const { decodedUserInfo, failRes } = req;
  try {
    const user = await getUserDataFromCookie(
      decodedUserInfo.nickName,
      decodedUserInfo.role
    );
    const room = await getRoomDataByUserId(user.id);
    const role = user.role === decodedUserInfo.role;
    const nickName = user.nickName === decodedUserInfo.nickName;
    if (!role || !nickName) return failRes(401, "비정상적인 접근 입니다.");
    completeRes({
      nickName: user.nickName,
      role: user.role,
      roomId: room.roomId,
    });
  } catch (e) {
    errorRes(e as Error);
  }
};

export const createNickName = async (req: RQ, res: RS) => {
  const {
    errorRes,
    completeRes,
    body: { nickName, socketId },
  } = req;

  try {
    const newUser = await createUserData({ nickName });
    const [room] = await findOrCreateRoom(newUser.id);
    const token = generateToken(
      newUser.nickName,
      newUser.role,
      newUser.id,
      room.roomId
    );

    res.cookie("jwt", token, {
      maxAge: 24 * 60 * 60 * 1000, // MS
      httpOnly: true, // prevent XSS attacks cross-site scripting attacks
      sameSite: "lax", // CSRF attacks cross-site request forgery attacks
      secure: process.env.NODE_ENV !== "development",
      signed: true,
    });

    userSocketMap[socketId] = newUser.id;

    completeRes({ ...newUser, roomId: room.roomId }, 201);
  } catch (e) {
    errorRes(e as Error);
  }
};
