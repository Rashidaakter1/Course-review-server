import { TReviews } from "./review.interface";
import { Reviews } from "./review.model";


const createReviewsIntoDb = async (payload: TReviews) => {
  const reviews = await Reviews.create(payload);
  return reviews;
};
const getReviewsFromDb = async () => {
  const reviews = await Reviews.find();
  return reviews;
};
const getSingleReviewsFromDb = async (id: string, payload: TReviews) => {
  const reviews = await Reviews.findById(id);
  return reviews;
};
const updateReviewsFromDb = async (id: string, payload: TReviews) => {
  const reviews = await Reviews.findByIdAndUpdate(id, { payload }, { new: true });
  return reviews;
};
const deleteReviewsFromDb = async (id: string, payload: TReviews) => {
  const reviews = await Reviews.findByIdAndUpdate(id, { payload }, { new: true });
  return reviews;
};

export const ReviewsServices = {
  createReviewsIntoDb,
  getReviewsFromDb,
  getSingleReviewsFromDb,
  updateReviewsFromDb,
  deleteReviewsFromDb,
};
