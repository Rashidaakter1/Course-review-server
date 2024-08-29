import { TCourse } from "./course.interface";
import { Course } from "./course.model";

const createCourseIntoDb = async (payload: TCourse) => {
  const course = await Course.create(payload);
  return course;
};
const getCourseFromDb = async () => {
  const course = await Course.find();
  return course;
};
const getSingleCourseFromDb = async (id: string, payload: TCourse) => {
  const course = await Course.findById(id);
  return course;
};
const updateCourseFromDb = async (id: string, payload: TCourse) => {
  const course = await Course.findByIdAndUpdate(id, { payload }, { new: true });
  return course;
};
const deleteCourseFromDb = async (id: string, payload: TCourse) => {
  const course = await Course.findByIdAndUpdate(id, { payload }, { new: true });
  return course;
};

export const CourseServices = {
  createCourseIntoDb,
  getCourseFromDb,
  getSingleCourseFromDb,
  updateCourseFromDb,
  deleteCourseFromDb,
};
