import express from "express";
import { CategoryControllers } from "./category.controller";
import validateRequest from "../../middleware/validateRequest";
import { categoryValidationSchema } from "./category.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../auth/auth.constant";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(categoryValidationSchema.createCategoryValidationSchema),
  CategoryControllers.createCategory
);
router.get("/", CategoryControllers.getCategory);
router.get("/:categoryId", CategoryControllers.getSingleCategory);
router.put("/:categoryId", CategoryControllers.updateSingleCategory);
router.delete("/:categoryId", CategoryControllers.deleteSingleCategory);

export const CategoryRoutes = router;
