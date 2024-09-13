import { model, Schema } from "mongoose";
import { TCategory } from "./category.interface";

const categorySchema = new Schema<TCategory>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  isDeleted: { type: Boolean, default: false },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

categorySchema.pre("find", async function (next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});
export const Category = model<TCategory>("Category", categorySchema);
