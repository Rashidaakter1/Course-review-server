import express from "express";
import { CategoryControllers } from "./category.controller";

const router = express.Router();

router.post("/", CategoryControllers.createCategory);

export const CategoryRoutes = router;
