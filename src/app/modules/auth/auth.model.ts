import mongoose, { Schema } from "mongoose";

import config from "../../config";
import bcrypt from "bcrypt";
import { TPasswordHistory, TUser } from "./auth.interface";

const passwordHistorySchema = new Schema<TPasswordHistory>(
  {
    password: {
      type: String,
    },
    createdAt: {
      type: Date,
    },
  },
  { _id: false }
);
const userSchema = new Schema<TUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
      select: 0,
    },
    passwordHistory: [passwordHistorySchema],
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
      default: "user",
    },
    isDeleted: {
      type: Boolean,
      default: false,
      select: 0,
    },
  },
  {
    timestamps: true,
  }
);


userSchema.pre("find", function (next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});
userSchema.pre("findOne", function (next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});
export const User = mongoose.model<TUser>("User", userSchema);
