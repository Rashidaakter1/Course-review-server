import express from "express";

import validateRequest from "../../middleware/validateRequest";
import { userValidations } from "./user.validation";
import { UserControllers } from "./user.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post(
  "/register",
  validateRequest(userValidations.createUserValidation),
  UserControllers.createUser
);

router.post(
  "/login",
  auth(),
  validateRequest(userValidations.loginUserValidation),
  UserControllers.createUser
);

export const UserRoutes = router;
