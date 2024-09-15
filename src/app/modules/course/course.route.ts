import express from "express";
import { CourseControllers } from "./course.controller";
import validateRequest from "../../middleware/validateRequest";
import { courseValidations } from "./course.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../auth/auth.constant";

const router = express.Router();
router.get("/best", CourseControllers.getBestCourse);
router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(courseValidations.createCourseValidation),
  CourseControllers.createCourse
);
router.get(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.user),
  CourseControllers.getCourse
);
router.get(
  "/:courseId",
  auth(USER_ROLE.admin, USER_ROLE.user),
  CourseControllers.getSingleCourse
);
router.put(
  "/:courseId",
  auth(USER_ROLE.admin),
  CourseControllers.updateSingleCourse
);
router.delete(
  "/:courseId",
  auth(USER_ROLE.admin),
  CourseControllers.deleteSingleCourse
);
router.get(
  "/:courseId/reviews",
  auth(USER_ROLE.admin, USER_ROLE.user),
  CourseControllers.getAllReviewsWithCourse
);

export const CourseRoutes = router;
