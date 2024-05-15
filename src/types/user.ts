export type UserRole = "admin" | "user";

export type NewUser = {
  latestContactTime: Date;
  id: string;
  nickName: string;
  password: string;
  role: UserRole;
};

export type DecodedUser = {
  nickName: string;
  iat: number;
  exp: number;
  iss: string;
  sub: string;
  role: UserRole;
  userId: string;
};

export type User = {
  id: string;
  nickName: string;
  password: string;
  profileImgUrl: string | null;
  role: UserRole;
  latestContactTime: Date;
  latestIp: string;
  deletedAt: Date;
};
