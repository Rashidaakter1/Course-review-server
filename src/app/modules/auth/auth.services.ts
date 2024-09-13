import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import createToken from "./auth.utils";
import { JwtPayload } from "jsonwebtoken";
const loginUser = async (payload: TLoginUser) => {
  //check if the user is already in the database
  const isUserExist = await User.findOne({ username: payload?.username });
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  // if the user is not isDeleted :true then
  if (isUserExist.isDeleted === true) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExist?.password
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.NOT_FOUND, "Users Password do not found");
  }
  // create an access token for the user
  const jwtPayload = {
    _id: isUserExist?._id,
    role: isUserExist?.role,
    email: isUserExist?.email,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt__access__token as string,
    config.jwt__access__expires__in as string
  );

  // create refresh token for the user
  const refreshToken = createToken(
    jwtPayload,
    config.jwt__refresh__token as string,
    config.jwt__refresh__expires__in as string
  );
  const user = {
    _id: isUserExist._id,
    username: isUserExist.username,
    email: isUserExist.email,
    role: isUserExist.role,
  };
  const result = {
    user,
    accessToken,
    refreshToken,
  };
  return result;
};
const changePasswordIntoDb = async (
  user: JwtPayload,
  payload: {
    currentPassword: string;
    newPassword: string;
  }
) => {
  const { _id } = user;

  const isUser = await User.findById(_id);
  const hashedPassword = isUser?.password as string;
  const isPasswordMatched = await bcrypt.compare(
    payload?.currentPassword,
    hashedPassword
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.NOT_FOUND, "Users Password do not found");
  }

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.salt__round)
  );
  const result = await User.findByIdAndUpdate(
    _id,
    {
      password: newHashedPassword,
    },
    { new: true }
  );

  return result;
};
const refreshTokenIntoDB = async (
  user: JwtPayload,
  payload: {
    currentPassword: string;
    newPassword: string;
  }
) => {
  const { _id } = user;

  const isUser = await User.findById(_id);
  const hashedPassword = isUser?.password as string;
  const isPasswordMatched = await bcrypt.compare(
    payload?.currentPassword,
    hashedPassword
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.NOT_FOUND, "Users Password do not found");
  }

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.salt__round)
  );
  const result = await User.findByIdAndUpdate(
    _id,
    {
      password: newHashedPassword,
    },
    { new: true }
  );

  return result;
};
const forgetPasswordDb = async (
  user: JwtPayload,
  payload: {
    currentPassword: string;
    newPassword: string;
  }
) => {
  const { _id } = user;

  const isUser = await User.findById(_id);
  const hashedPassword = isUser?.password as string;
  const isPasswordMatched = await bcrypt.compare(
    payload?.currentPassword,
    hashedPassword
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.NOT_FOUND, "Users Password do not found");
  }

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.salt__round)
  );
  const result = await User.findByIdAndUpdate(
    _id,
    {
      password: newHashedPassword,
    },
    { new: true }
  );

  return result;
};
const resetPasswordDb = async (
  user: JwtPayload,
  payload: {
    currentPassword: string;
    newPassword: string;
  }
) => {
  const { _id } = user;

  const isUser = await User.findById(_id);
  const hashedPassword = isUser?.password as string;
  const isPasswordMatched = await bcrypt.compare(
    payload?.currentPassword,
    hashedPassword
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.NOT_FOUND, "Users Password do not found");
  }

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.salt__round)
  );
  const result = await User.findByIdAndUpdate(
    _id,
    {
      password: newHashedPassword,
    },
    { new: true }
  );

  return result;
};

export const AuthServices = {
  loginUser,
  changePasswordIntoDb,
  refreshTokenIntoDB,
  forgetPasswordDb,
  resetPasswordDb,
};
