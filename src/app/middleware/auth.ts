import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modules/auth/auth.interface";
import { User } from "../modules/auth/auth.model";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You do not have the necessary permissions to access this resource."
      );
    }
    const decoded = jwt.verify(
      token,
      config.jwt__access__token as string
    ) as JwtPayload;

    const { _id, role } = decoded;
    const isUserExist = await User.findById(_id);
    if (!isUserExist) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    // check user is deleted or not
    const isDeleted = isUserExist.isDeleted;
    if (isDeleted === true) {
      throw new AppError(httpStatus.FORBIDDEN, "User is deleted");
    }

    //Check the roles
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
