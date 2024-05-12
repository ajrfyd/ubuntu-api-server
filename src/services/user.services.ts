import { v4 } from "uuid";
import db from "../db/models/index.js";
import { NewUser, UserRole, User } from "../types/user.js";

export const createUserData = async ({
  nickName,
  password,
}: {
  nickName: string;
  password: string;
}): Promise<NewUser> => {
  const result = await db.User.create({
    id: `U-${v4()}`,
    nickName,
    password,
    role: "user",
  });
  console.log(result.dataValues);
  return result.dataValues;
};

export const getUserDataByNickName = async (
  nickName: string
): Promise<User> => {
  return await db.User.findOne({ where: { nickName }, raw: true });
};

export const getUserDataFromCookie = async (
  nickName: string,
  role: UserRole
): Promise<User> => {
  return await db.User.findOne({ where: { nickName, role }, raw: true });
};
