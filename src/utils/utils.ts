import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import cookie from "cookie";
import cookieParser from "cookie-parser";
import { UserRole } from "../types/user";
import constants from "./constants.js";

const { BC_SALT, JWT_SECRET } = process.env;
const { EXPIRES } = constants;

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

export const generateToken = (
  nickName: string,
  role: UserRole,
  userId: string,
  roomId: string
) =>
  jwt.sign({ nickName, role, userId, roomId }, JWT_SECRET as string, {
    // expiresIn: "15d",
    expiresIn: EXPIRES,
    issuer: "ajrfyd",
    subject: "userInfo",
  });

export const decodeToken = (token: string) =>
  jwt.verify(token, JWT_SECRET as string);

const userSocketMap: Record<string, string> = {};

export const decodeUser = (token: string): CustomJwtPayload =>
  jwt.verify(token, process.env.JWT_SECRET) as CustomJwtPayload;

interface CustomJwtPayload extends JwtPayload {
  nickName: string;
  role: "user" | "admin";
  userId: string;
  iat: number;
  exp: number;
  iss: string;
  sub: string;
}

export const getSocketId = (
  socketMap: Record<string, string>,
  id: string
): string | null => {
  const [target] = Object.entries(socketMap).filter((arr) => arr[1] === id);

  return target ? target[0] : null;
};

export const getCookie = (cookie: string, name: string): string | undefined => {
  let matches = cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const parseCookieHandler = (cookieStr: string, key: string) => {
  const parsed = cookie.parse(cookieStr);

  const sigendCookie = cookieParser.signedCookies(
    parsed,
    process.env.COOKIE_SECRET
  );
  return sigendCookie[key];
};
