import { USER_ROLE } from "./auth.constant";

export type TPasswordHistory = {
  password: string;
  createdAt: Date;
};
export type TUser = {
  username: string;
  email: string;
  password: string;
  passwordHistory: TPasswordHistory[];
  role: "admin" | "user";
  isDeleted: boolean;
};

export type TLoginUser = {
  username: string;
  password: string;
};

export type TUserRole = keyof typeof USER_ROLE;
