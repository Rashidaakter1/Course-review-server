import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.services";
import { Request, Response } from "express";
import config from "../../config";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);
  const { accessToken, refreshToken, user } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE__DEV === "production",
    httpOnly: true,
  });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User is logged in successfully!",
    data: {
      user: user,
      token: accessToken,
    },
  });
});
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  console.log(req.user);
  const result = await AuthServices.changePasswordIntoDb(req.user, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User is logged in successfully!",
    data: result,
  });
});
const changePassword = catchAsync(async (req: Request, res: Response) => {
  console.log(req.user);
  const result = await AuthServices.changePasswordIntoDb(req.user, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User is logged in successfully!",
    data: result,
  });
});
const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  console.log(req.user);
  const result = await AuthServices.changePasswordIntoDb(req.user, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User is logged in successfully!",
    data: result,
  });
});
const resetPassword = catchAsync(async (req: Request, res: Response) => {
  console.log(req.user);
  const result = await AuthServices.changePasswordIntoDb(req.user, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User is logged in successfully!",
    data: result,
  });
});
export const AuthControllers = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
