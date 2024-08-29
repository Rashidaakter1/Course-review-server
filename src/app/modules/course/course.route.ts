import express from "express";
import { CourseControllers } from "./course.controller";
import validateRequest from "../../middleware/validateRequest";
import { courseValidations } from "./course.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(courseValidations.createCourseValidation),
  CourseControllers.createCourse
);
router.get("/", CourseControllers.getCourse);

export const CourseRoutes = router;
