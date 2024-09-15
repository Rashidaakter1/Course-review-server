import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { TLoginUser, TPasswordHistory, TUser } from "./auth.interface";
import bcrypt from "bcrypt";
import createToken from "./auth.utils";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { User } from "./auth.model";

const createUserIntoDB = async (payload: TUser) => {
  const { password } = payload;
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.salt__round)
  );

  const result = await User.create({
    ...payload,
    password: hashedPassword,
    passwordHistory: [
      {
        password: hashedPassword,
        createdAt: new Date(),
      },
    ],
  });
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  //check if the user is already in the database
  const isUserExist = await User.findOne({
    username: payload?.username,
  }).select("+password");

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User is not found");
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

  const isUser = await User.findById(_id).select("+password");
  const hashedPassword = isUser?.password as string;
  const isPasswordMatched = await bcrypt.compare(
    payload?.currentPassword,
    hashedPassword
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.NOT_FOUND, "Users Password do not found");
  }
  if (payload.newPassword === payload.currentPassword) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Current password and new password is same"
    );
  }

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.salt__round)
  );

  const twoPasswordsHistory = isUser?.passwordHistory.slice(-2);
  console.log(twoPasswordsHistory);

  // check if the passwords are already in password History
  const comparePasswords = async (
    newPassword: string,
    twoPasswordsHistory: any
  ) => {
    for (const oldPassword of twoPasswordsHistory) {
      const isMatch = await bcrypt.compare(newPassword, oldPassword.password);

      if (isMatch) {
        const lastUsedDate = new Date(oldPassword.createdAt).toLocaleString(
          "en-US",
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true, // AM/PM format
          }
        );

        throw new AppError(
          httpStatus.BAD_REQUEST,
          `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${lastUsedDate}).`
        );
      }
    }
  };
  await comparePasswords(payload.newPassword, twoPasswordsHistory);

  const anotherPassword = {
    password: newHashedPassword,
    createdAt: new Date(),
  };
  isUser?.passwordHistory.push(anotherPassword);

  const result = await User.findByIdAndUpdate(
    _id,
    {
      password: newHashedPassword,
      passwordHistory: isUser?.passwordHistory,
    },
    { new: true }
  );

  return result;
};
const refreshTokenIntoDB = async (token: string) => {
  const decoded = jwt.verify(token, config.jwt__refresh__token as string);

  console.log(decoded, "refresh");
  const { _id, role, email } = decoded as JwtPayload;

  // create an access token for the user
  const jwtPayload = {
    _id: _id,
    role: role,
    email: email,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt__access__token as string,
    config.jwt__access__expires__in as string
  );
  const result = {
    accessToken,
  };
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
  createUserIntoDB,
  loginUser,
  changePasswordIntoDb,
  refreshTokenIntoDB,
  forgetPasswordDb,
  resetPasswordDb,
};
