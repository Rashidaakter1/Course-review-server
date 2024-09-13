import express from "express";

import validateRequest from "../../middleware/validateRequest";

import auth from "../../middleware/auth";
import { AuthValidations } from "./auth.validation";
import { AuthControllers } from "./auth.controller";
import { USER_ROLE } from "./auth.constant";

const router = express.Router();
router.post(
  "/login",
  auth(USER_ROLE.user),
  validateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.loginUser
);
router.post(
  "/change-password",
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(AuthValidations.changePasswordValidationSchema),
  AuthControllers.changePassword
);
router.post(
  "/refresh-token",
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(AuthValidations.refreshTokenValidationSchema),
  AuthControllers.changePassword
);

export const AuthRoutes = router;
