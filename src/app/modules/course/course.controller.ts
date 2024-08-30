import { Request, Response } from "express";
import catchAsync from "../../utlils/catchAsync";

import sendRequest from "../../utlils/sendRequest";
import httpStatus from "http-status";
import { CourseServices } from "./course.service";

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseServices.createCourseIntoDb(req.body);

  sendRequest(res, {
    success: true,
    statusCode: 201,
    message: "Course created successfully!",
    data: result,
  });
});

const getCourse = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  console.log(query);
  const result = await CourseServices.getCourseFromDb(query);

  sendRequest(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Courses retrieved successfully",
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req: Request, res: Response) => {
  const courseId = req.params.courseId;
  const result = await CourseServices.getSingleCourseFromDb(courseId);

  sendRequest(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Course created successfully!",
    data: result,
  });
});

const updateSingleCourse = catchAsync(async (req: Request, res: Response) => {
  const courseId = req.params.courseId;
  const result = await CourseServices.updateCourseFromDb(courseId, req.body);

  sendRequest(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Course is updated successfully!",
    data: result,
  });
});

const deleteSingleCourse = catchAsync(async (req: Request, res: Response) => {
  const courseId = req.params.courseId;
  const result = await CourseServices.deleteCourseFromDb(courseId, req.body);

  sendRequest(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Course is deleted successfully!",
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getCourse,
  getSingleCourse,
  updateSingleCourse,
  deleteSingleCourse,
};
