import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { searchableArray } from "./course.constant";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";
import { handleCalculatedDuration } from "./course.utli";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Reviews } from "../review/review.model";

const createCourseIntoDb = async (payload: TCourse) => {
  const { startDate, endDate } = payload;
  let calculatedDuration: number = handleCalculatedDuration(startDate, endDate);
  payload.durationInWeeks = calculatedDuration;
  const course = await Course.create(payload);
  return course;
};
const getCourseFromDb = async (query: Record<string, unknown>) => {
  const queryCourse = new QueryBuilder(
    Course.find().select("-isDeleted"),
    query
  )
    .search(searchableArray)
    .filter()
    .sort()
    .paginate()
    .fields();

  const filteredCourse = await queryCourse.modelQuery;
  return filteredCourse;
};
const getSingleCourseFromDb = async (id: string) => {
  const course = await Course.findById(id).where({ isDeleted: { $ne: true } });
  return course;
};
const updateCourseFromDb = async (id: string, payload: Partial<TCourse>) => {
  const { details, tags, ...remainingData } = payload;
  const session = await mongoose.startSession();

  try {
    await session.startTransaction();

    // 1. Basic fields will be Updated
    const updatedBasicCourse = await Course.findByIdAndUpdate(
      id,
      remainingData,
      {
        new: true,
        runValidators: true,
        session,
      }
    );

    if (!updatedBasicCourse) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to Update Course");
    }

    // 2. Update `details` object fields
    if (details && Object.keys(details).length) {
      const modifiedData: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(details)) {
        modifiedData[`details.${key}`] = value;
      }

      const detailsModifiedCourse = await Course.findByIdAndUpdate(
        id,
        modifiedData,
        {
          new: true,
          runValidators: true,
          session,
        }
      );

      if (!detailsModifiedCourse) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          "Failed to Update Course Details"
        );
      }
    }

    // 3. Update `tags`
    if (tags && tags.length > 0) {
      // Remove deleted tags
      const deletedTags = tags
        .filter((el) => el.name && el.isDeleted)
        .map((el) => el.name);
      if (deletedTags.length > 0) {
        const deletedTagsCourse = await Course.findByIdAndUpdate(
          id,
          {
            $pull: { tags: { name: { $in: deletedTags } } },
          },
          {
            new: true,
            runValidators: true,
            session,
          }
        );

        if (!deletedTagsCourse) {
          throw new AppError(httpStatus.BAD_REQUEST, "Failed to Remove Tags");
        }
      }

      // Add non-deleted tags
      const notDeletedTags = tags.filter((el) => el.name && !el.isDeleted);
      if (notDeletedTags.length > 0) {
        const notDeletedTagsCourse = await Course.findByIdAndUpdate(
          id,
          { $addToSet: { tags: { $each: notDeletedTags } } }, // Use full objects
          {
            new: true,
            runValidators: true,
            session,
          }
        );

        if (!notDeletedTagsCourse) {
          throw new AppError(httpStatus.BAD_REQUEST, "Failed to Add Tags");
        }
      }
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await Course.findById(id).populate("tags.name");
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    console.error("Error updating course:", error); // Log original error
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to Update Course");
  }
};

const deleteCourseFromDb = async (id: string) => {
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: { isDeleted: true },
    },
    { new: true }
  );

  console.log(course, "course deleted");
};

const getAllReviewsWithCourseFromDb = async (id: string) => {
  // Fetch the course details
  const course = await Course.findById(id).where({ isDeleted: { $ne: true } });
  console.log(course);
  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  }

  // Fetch all reviews related to the course
  const allReviewsWithSameId = await Reviews.find({ courseId: id });

  // Prepare the response data
  const allReviewWithCourse = {
    course,
    reviews: allReviewsWithSameId,
  };

  return allReviewWithCourse;
};

const getBestReviewsWithCourseFromDb = async () => {
  const bestReviewedCourse = await Reviews.aggregate([
    {
      // Group by courseId and calculate the average rating
      $group: {
        _id: "$courseId",
        averageRating: { $avg: "$rating" },
        reviewCount: { $count: {} },
      },
    },
    {
      // Sort by average rating in descending order
      $sort: { averageRating: -1 },
    },
    {
      // Limit to top 10 best reviewed courses (or change the limit as needed)
      $limit: 1,
    },
  ]);

  const courseData = await Course.findById(bestReviewedCourse[0]._id);

  const data = {
    course: courseData,
    averageRating: bestReviewedCourse[0].averageRating,
    reviewCount: bestReviewedCourse[0].reviewCount,
  };
  console.log(data);
  return data;
};

export const CourseServices = {
  createCourseIntoDb,
  getCourseFromDb,
  getSingleCourseFromDb,
  updateCourseFromDb,
  deleteCourseFromDb,
  getAllReviewsWithCourseFromDb,
  getBestReviewsWithCourseFromDb,
};
