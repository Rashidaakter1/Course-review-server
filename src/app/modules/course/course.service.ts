import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { searchableArray } from "./course.constant";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";
import { handleCalculatedDuration } from "./course.utli";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createCourseIntoDb = async (payload: TCourse) => {
  const { startDate, endDate } = payload;
  let calculatedDuration: number = handleCalculatedDuration(startDate, endDate);
  payload.durationInWeeks = calculatedDuration;
  const course = await Course.create(payload);
  return course;
};
const getCourseFromDb = async (query: Record<string, unknown>) => {
  const queryCourse = new QueryBuilder(Course.find(), query)
    .search(searchableArray)
    .filter()
    .sort()
    .paginate()
    .fields();

  const filteredCourse = await queryCourse.modelQuery;
  return filteredCourse;
};
const getSingleCourseFromDb = async (id: string) => {
  const course = await Course.findById(id);
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
      throw new AppError("Failed to Update Course", httpStatus.BAD_REQUEST);
    }
    // the ends of the basic fields

    //2. object fields will be updated

    let modifiedData: Record<string, unknown> = {};
    if (details && Object.keys(details).length) {
      for (const [key, value] of Object.entries(details)) {
        modifiedData[`details.${key}`] = value;
      }
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
      throw new AppError("Failed to Update Course", httpStatus.BAD_REQUEST);
    }
    // the ends

    //3. tags will be modified

    if (tags && tags.length > 0) {
      const deletedTags = tags
        .filter((el) => el.isDeleted)
        .map((el) => el.name);

      console.log(deletedTags, "delted tags");
      const deletedTagsCourse = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            tags: { name: { $in: deletedTags } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        }
      );

      if (!deletedTagsCourse) {
        throw new AppError("Failed to Update Course", httpStatus.BAD_REQUEST);
      }

      // if is deleted is false thne the logic

      const notDeletedTags = tags
        .filter((el) => !el.isDeleted)
        .map((el) => el.name);
      console.log(notDeletedTags, " Not deleted tags");
      const notDeletedTagsCourse = await Course.findByIdAndUpdate(
        id,
        { $addToSet: { tags: { $each: notDeletedTags } } },
        {
          new: true,
          runValidators: true,
          session,
        }
      );

      if (!notDeletedTagsCourse) {
        throw new AppError("Failed to Update Course", httpStatus.BAD_REQUEST);
      }
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await Course.findById(id).populate("tags.name");

    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError("Failed to Update Course", httpStatus.BAD_REQUEST);
  }
};
const deleteCourseFromDb = async (id: string, payload: TCourse) => {
  const course = await Course.findByIdAndUpdate(id, payload, { new: true });
  return course;
};

export const CourseServices = {
  createCourseIntoDb,
  getCourseFromDb,
  getSingleCourseFromDb,
  updateCourseFromDb,
  deleteCourseFromDb,
};
