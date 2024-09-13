import { Types } from "mongoose";

export type TCategory = {
  name: string;
  isDeleted: boolean;
  createdBy: Types.ObjectId;
};
