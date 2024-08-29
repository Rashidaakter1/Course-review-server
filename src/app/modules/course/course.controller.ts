import { Request, Response } from "express";
import catchAsync from "../../utlils/catchAsync";

import sendRequest from "../../utlils/sendRequest";
import httpStatus from "http-status";
import { CourseServices } from "./course.service";

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseServices.createCourseIntoDb(req.body);

  sendRequest(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Course created successfully!",
    data: result,
  });
});

const getCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseServices.getCourseFromDb();

  sendRequest(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Categories retrieved successfully",
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseServices.createCourseIntoDb(req.body);

  sendRequest(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Course created successfully!",
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getCourse,
};
