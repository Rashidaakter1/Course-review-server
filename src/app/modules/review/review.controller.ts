import { Request, Response } from "express";
import catchAsync from "../../utlils/catchAsync";
import sendRequest from "../../utlils/sendRequest";
import httpStatus from "http-status";
import { ReviewsServices } from "./review.service";


const createReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewsServices.createReviewsIntoDb(req.body);

  sendRequest(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Reviews created successfully!",
    data: result,
  });
});

const getReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewsServices.getReviewsFromDb();

  sendRequest(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Categories retrieved successfully",
    data: result,
  });
});

const getSingleReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewsServices.createReviewsIntoDb(req.body);

  sendRequest(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Reviews created successfully!",
    data: result,
  });
});

export const ReviewsControllers = {
  createReviews,
  getReviews,
};
