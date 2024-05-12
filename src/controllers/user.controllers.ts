import { RQ, RS } from "../types/common.js";
import {
  createUserData,
  getUserDataByNickName,
  getUserDataFromCookie,
} from "../services/user.services.js";
import { hashPassword, generateToken, compared } from "../utils/utils.js";

export const createUser = async (req: RQ, res: RS) => {
  const { completeRes, failRes, errorRes, body } = req;
  const { nickName, password } = body;

  try {
    const hashedPwd = await hashPassword(password);
    const newUser = await createUserData({ nickName, password: hashedPwd });
    const token = generateToken(newUser.nickName, newUser.role);

    res.cookie("jwt", token, {
      maxAge: 24 * 60 * 60 * 1000, // MS
      httpOnly: true, // prevent XSS attacks cross-site scripting attacks
      sameSite: "strict", // CSRF attacks cross-site request forgery attacks
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

  try {
    const user = await getUserDataByNickName(nickName);
    if (!user) return failRes(401, "존재하지 않는 닉네임 입니다.");
    const comparedPwd = await compared(password, user.password);
    if (!comparedPwd) return failRes(401, "비밀번호를 다시 확인해 주세요.");

    const token = generateToken(user.nickName, user.role);

    res.cookie("jwt", token, {
      maxAge: 24 * 60 * 60 * 1000, // MS
      httpOnly: true, // prevent XSS attacks cross-site scripting attacks
      sameSite: "lax", // CSRF attacks cross-site request forgery attacks
      // sameSite: "none",
      secure: process.env.NODE_ENV !== "development",
      signed: true,
    });

    completeRes({ token, nickName: user.nickName, role: user.role });
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
    const role = user.role === decodedUserInfo.role;
    const nickName = user.nickName === decodedUserInfo.nickName;
    if (!role || !nickName) return failRes(401, "비정상적인 접근 입니다.");
    completeRes({ nickName: user.nickName, role: user.role });
  } catch (e) {
    errorRes(e as Error);
  }
};
