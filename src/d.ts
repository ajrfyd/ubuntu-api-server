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
    }
  }
}

interface R {}
interface T {}
