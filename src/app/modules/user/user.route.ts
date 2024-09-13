import express from "express";

import validateRequest from "../../middleware/validateRequest";
import { userValidations } from "./user.validation";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.post(
  "/register",
  validateRequest(userValidations.createUserValidation),
  UserControllers.createUser
);

export const UserRoutes = router;
