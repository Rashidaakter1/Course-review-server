import { Request, Response } from "express";
import catchAsync from "../../utlils/catchAsync";

import sendRequest from "../../utlils/sendRequest";
import httpStatus from "http-status";
import { CourseServices } from "./course.service";
import { Course } from "./course.model";

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

  let queryPage = query.page ? Number(query.page) : 1;
  let queryLimit = query.limit ? Number(query.limit) : 10;
  const total = await Course.countDocuments({});
  const meta = {
    page: queryPage,
    limit: queryLimit,
    total: total,
  };
  const result = await CourseServices.getCourseFromDb(query);

  sendRequest(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Courses retrieved successfully",
    meta: meta,
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req: Request, res: Response) => {
  const courseId = req.params.courseId;
  const result = await CourseServices.getSingleCourseFromDb(courseId);

  sendRequest(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Course is retrieved successfully!",
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

const getAllReviewsWithCourse = catchAsync(
  async (req: Request, res: Response) => {
    const courseId = req.params.courseId;
    const result = await CourseServices.getAllReviewsWithCourseFromDb(courseId);

    sendRequest(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Course and Reviews retrieved successfully!",
      data: result,
    });
  }
);
const getBestCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseServices.getBestReviewsWithCourseFromDb();

  sendRequest(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Best course retrieved successfully!",
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getCourse,
  getSingleCourse,
  updateSingleCourse,
  deleteSingleCourse,
  getAllReviewsWithCourse,
  getBestCourse,
};
