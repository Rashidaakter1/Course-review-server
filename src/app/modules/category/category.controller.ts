import { Request, Response } from "express";
import catchAsync from "../../utlils/catchAsync";
import { CategoryServices } from "./category.service";
import sendRequest from "../../utlils/sendRequest";
import httpStatus from "http-status";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.createCategoryIntoDb(req.body);

  sendRequest(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Category created successfully!",
    data: result,
  });
});

const getCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.getCategoryFromDb();

  sendRequest(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Categories retrieved successfully",
    data: result,
  });
});

const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.createCategoryIntoDb(req.body);

  sendRequest(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Category created successfully!",
    data: result,
  });
});

export const CategoryControllers = {
  createCategory,
  getCategory,
};
