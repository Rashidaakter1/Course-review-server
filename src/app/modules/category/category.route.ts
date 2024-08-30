import express from "express";
import { CategoryControllers } from "./category.controller";
import validateRequest from "../../middleware/validateRequest";
import { categoryValidationSchema } from "./category.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(categoryValidationSchema.createCategoryValidationSchema),
  CategoryControllers.createCategory
);
router.get("/", CategoryControllers.getCategory);
router.get("/:categoryId", CategoryControllers.getSingleCategory);
router.put("/:categoryId", CategoryControllers.updateSingleCategory);
router.delete("/:categoryId", CategoryControllers.deleteSingleCategory);

export const CategoryRoutes = router;
