import { MiddlewareFnType } from "../types/common.js";
import { getUserDataByNickName } from "../services/user.services.js";

export const checkUserDuplication: MiddlewareFnType = async (
  req,
  res,
  next
) => {
  const { nickName, password, rePassword } = req.body;
  const { failRes } = req;
  if (!nickName || !password || !rePassword)
    return failRes(400, "값이 모두 입력되지 않았습니다.");
  if (password !== rePassword)
    return failRes(400, "패스워드가 서로 일치하지 않습니다.");
  const user = await getUserDataByNickName(nickName);
  if (user) return failRes(400, "이미 존재하는 닉네임 입니다.");
  next();
};

export const checkUserLoginInfo: MiddlewareFnType = (req, res, next) => {
  const { failRes, body } = req;
  const { nickName, password } = body;
  if (nickName.length < 5) return failRes(401, "닉네임은 5자 이상입니다.");
  if (password.length < 8) return failRes(401, "패스워드는 8자 이상입니다.");
  next();
};
