import config from "../../config";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const getUserFromDB = async () => {};
const getSingleUserFromDB = async () => {};
const updateUserIntoDB = async () => {};

export const UserServices = {
  createUserIntoDB,
  getUserFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,

};
