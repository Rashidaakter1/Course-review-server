import { model, Schema } from "mongoose";
import { TReviews } from "./review.interface";

const ReviewsSchema = new Schema<TReviews>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    rating: { type: Number, required: true },
    review: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Reviews = model<TReviews>("Reviews", ReviewsSchema);
