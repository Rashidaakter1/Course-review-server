import { USER_ROLE } from "./auth.constant";

export type TLoginUser = {
  username: string;
  password: string;
};

export type TUserRole = keyof typeof USER_ROLE;