import express from "express";
import { CourseControllers } from "./course.controller";
import validateRequest from "../../middleware/validateRequest";
import { courseValidations } from "./course.validation";

const router = express.Router();
router.get("/best", CourseControllers.getBestCourse);
router.post(
  "/",
  validateRequest(courseValidations.createCourseValidation),
  CourseControllers.createCourse
);
router.get("/", CourseControllers.getCourse);
router.get("/:courseId", CourseControllers.getSingleCourse);
router.put("/:courseId", CourseControllers.updateSingleCourse);
router.get("/:courseId/reviews", CourseControllers.getAllReviewsWithCourse);

router.delete("/:courseId", CourseControllers.deleteSingleCourse);

export const CourseRoutes = router;
