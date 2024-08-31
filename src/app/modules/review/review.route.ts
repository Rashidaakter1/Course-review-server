import express from "express";
import { ReviewsControllers } from "./review.controller";
import validateRequest from "../../middleware/validateRequest";
import { ReviewsValidations } from "./review.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(ReviewsValidations.createReviewsValidation),
  ReviewsControllers.createReviews
);
router.get("/", ReviewsControllers.getReviews);
router.get("/:reviewId", ReviewsControllers.getSingleReviews);
router.put(
  "/:reviewId",
  validateRequest(ReviewsValidations.updateReviewsValidation),
  ReviewsControllers.updateSingleReviews
);
router.delete("/:reviewId", ReviewsControllers.deleteSingleReviews);

export const ReviewsRoutes = router;
