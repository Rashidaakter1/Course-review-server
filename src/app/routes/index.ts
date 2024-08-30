import express from "express";
import { CategoryRoutes } from "../modules/category/category.route";
import { CourseRoutes } from "../modules/course/course.route";
import { ReviewsRoutes } from "../modules/review/review.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/courses",
    route: CourseRoutes,
  },
  {
    path: "/categories",
    route: CategoryRoutes,
  },
  {
    path: "/reviews",
    route: ReviewsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
