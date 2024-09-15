import { JwtPayload } from "jsonwebtoken";
import QueryBuilder from "../../builder/QueryBuilder";
import { searchableReviewArray } from "./review.constant";
import { TReviews } from "./review.interface";
import { Reviews } from "./review.model";
import { Course } from "../course/course.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import mongoose from "mongoose";

const createReviewsIntoDb = async (user: JwtPayload, payload: TReviews) => {
  const { courseId } = payload;
  const isCourseExists = await Course.findById(courseId);
  if (!isCourseExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "Course is  not found");
  }
  const reviews = await Reviews.create({ ...payload, createdBy: user._id });
  return reviews;
};
const getReviewsFromDb = async (query: Record<string, unknown>) => {
  const queryReview = new QueryBuilder(
    Reviews.find()
      .select("-isDeleted")
      .populate("createdBy", { _id: 1, username: 1, email: 1, role: 1 }),
    query
  )
    .search(searchableReviewArray)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await queryReview.modelQuery;
  return result;
};
const getSingleReviewsFromDb = async (id: string) => {
  const isReviewsExists = await Reviews.findById(id);
  if (!isReviewsExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "Review is  not found");
  }

  const reviews = await Reviews.findById(id)
    .select("-isDeleted")
    .where({ isDeleted: { $ne: true } });
  return reviews;
};
const updateReviewsFromDb = async (
  user: JwtPayload,
  id: string,
  payload: Partial<TReviews>
) => {
  const isReviewsExists = await Reviews.findById(id);
  if (!isReviewsExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "Review is  not found");
  }

  const { _id } = user;
  if (!isReviewsExists.createdBy.equals(new mongoose.Types.ObjectId(_id))) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "you can not update this review "
    );
  }
  const isCourseExists = await Course.findById(isReviewsExists.courseId);
  if (!isCourseExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "Course is  not found");
  }
  const reviews = await Reviews.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return reviews;
};
const deleteReviewsFromDb = async (user: JwtPayload, id: string) => {
  const isReviewsExists = await Reviews.findById(id);
  if (!isReviewsExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "Review is  not found");
  }
  if (isReviewsExists.isDeleted === true) {
    throw new AppError(httpStatus.BAD_REQUEST, "Review is  already deleted");
  }
  const { _id } = user;
  if (!isReviewsExists.createdBy.equals(new mongoose.Types.ObjectId(_id))) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "you can not update this review "
    );
  }
  const reviews = await Reviews.findByIdAndUpdate(
    id,
    {
      $set: { isDeleted: true },
    },
    { new: true }
  );
  return reviews;
};

export const ReviewsServices = {
  createReviewsIntoDb,
  getReviewsFromDb,
  getSingleReviewsFromDb,
  updateReviewsFromDb,
  deleteReviewsFromDb,
};
