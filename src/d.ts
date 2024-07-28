import { type TagType } from "./types/post.js";
import { type BaseResponseType } from "./types/common.js";
import { type UserRole, type DecodedUser } from "./types/user.js";

declare global {
  namespace Express {
    interface Request {
      resultState: BaseResponseType<R>;
      completeRes: <T>(result: T, status?: number) => void;
      failRes: (status: number, message?: string) => void;
      errorRes: (error: Error) => void;
      tags: TagType[];
      isAdmin: boolean;
      isVisit: boolean;
      decodedUserInfo: DecodedUser;
      needToMsgsData: {
        userId: string;
        roomId: string;
      };
      verifiedUser: {
        id: string;
        nickName: string;
        role: UserRole;
      };
      fromTo: {
        to: string;
        from: string;
        roomId: string;
      };
      hasCookie: boolean;
    }
  }

  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      KLOG_DEV_USERNAME: string;
      KLOG_DEV_PWD: string;
      KLOG_DEV_DBNAME: string;
      KLOG_USERNAME: string;
      KLOG_PWD: string;
      KLOG_DBNAME: string;
      KLOG_ENV: "development" | "production";
      KLOG_PWD_SALT: string;
      NODE_ENV: "development" | "production";
      BC_SALT: number;
      JWT_SECRET: string;
      COOKIE_SECRET: string;
    }
  }
}

// declare namespace NodeJS {
//   interface ProcessEnv {
//     JWT_SECRET: string;
//   }
// }

interface R {}
interface T {}
