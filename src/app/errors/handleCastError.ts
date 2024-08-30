import mongoose from "mongoose";
import { TGGenericErrorResponse } from "../interface/error";

const handleCastError = (
  err: mongoose.Error.CastError
): TGGenericErrorResponse => {
  let errorMessage = `${err?.value}  is not a valid ID!`;
  return {
    message: "Invalid Id ",
    errorMessage,
  };
};

export default handleCastError;
