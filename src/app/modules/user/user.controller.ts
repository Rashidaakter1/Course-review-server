import { Request, Response } from "express";

import { User } from "./user.model";
import { UserServices } from "./user.services";
import catchAsync from "../../utils/catchAsync";

import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createUserIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User created successfully",
    data: result,
  });
});

export const UserControllers = {
  createUser,
};
