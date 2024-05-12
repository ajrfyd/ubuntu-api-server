import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRole } from "../types/user";

const { BC_SALT, JWT_SECRET } = process.env;

export const hashPassword = (password: string) =>
  bcrypt.hash(password, Number(BC_SALT));

export const compared = (password: string, hashed: string) =>
  bcrypt.compare(password, hashed);

export const makeErr = (name: string, message: string) => {
  const Err = new Error();
  Err.name = name;
  Err.message = message;
  throw Err;
};

export const getToken = (token: string): string[] => token.split(" ");

export const getMaxAgeTime = (now: Date) => {
  let h = now.getHours();
  let m = now.getMinutes();

  h = m > 0 ? 24 - h - 1 : 24 - h;
  m = 60 - m;
  return [h, m];
};

export const generateToken = (nickName: string, role: UserRole) =>
  jwt.sign({ nickName, role }, JWT_SECRET as string, {
    // expiresIn: "15d",
    expiresIn: "1m",
    issuer: "ajrfyd",
    subject: "userInfo",
  });

export const decodeToken = (token: string) =>
  jwt.verify(token, JWT_SECRET as string);
