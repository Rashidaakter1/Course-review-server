import QueryBuilder from "../../builder/QueryBuilder";
import { searchableReviewArray } from "./review.constant";
import { TReviews } from "./review.interface";
import { Reviews } from "./review.model";

const createReviewsIntoDb = async (payload: TReviews) => {
  const reviews = await Reviews.create(payload);
  return reviews;
};
const getReviewsFromDb = async (query: Record<string, unknown>) => {
  const queryReview = new QueryBuilder(
    Reviews.find().select("-isDeleted"),
    query
  )
    .search(searchableReviewArray)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await queryReview.modelQuery;
  return result;
};
const getSingleReviewsFromDb = async (id: string, payload: TReviews) => {
  const reviews = await Reviews.findById(id)
    .select("-isDeleted")
    .where({ isDeleted: { $ne: true } });
  return reviews;
};
const updateReviewsFromDb = async (id: string, payload: Partial<TReviews>) => {
  const reviews = await Reviews.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return reviews;
};
const deleteReviewsFromDb = async (id: string, payload: Partial<TReviews>) => {
  const reviews = await Reviews.findByIdAndUpdate(id, payload, {
    $set: { isDeleted: true },
  });
  return reviews;
};

export const ReviewsServices = {
  createReviewsIntoDb,
  getReviewsFromDb,
  getSingleReviewsFromDb,
  updateReviewsFromDb,
  deleteReviewsFromDb,
};
