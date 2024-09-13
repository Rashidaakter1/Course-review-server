import { model, Schema } from "mongoose";
import { TCourse, TDetails } from "./course.interface";

const detailsSchema = new Schema<TDetails>({
  level: { type: String, required: true },
  description: { type: String, required: true },
});

const courseSchema = new Schema<TCourse>(
  {
    title: { type: String, required: true, unique: true },
    instructor: { type: String, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
    price: { type: Number, required: true },
    tags: [
      {
        name: { type: String, required: true },
        isDeleted: { type: Boolean, default: false },
        _id: false,
      },
    ],
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    language: { type: String, required: true },
    provider: { type: String, required: true },
    durationInWeeks: { type: Number },
    details: detailsSchema,
    isDeleted: { type: Boolean, default: false },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

courseSchema.pre("find", async function (next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

export const Course = model<TCourse>("Course", courseSchema);
