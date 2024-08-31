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
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

ReviewsSchema.pre("find", async function (next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

export const Reviews = model<TReviews>("Reviews", ReviewsSchema);
