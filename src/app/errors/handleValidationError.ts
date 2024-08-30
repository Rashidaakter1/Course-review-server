import mongoose from "mongoose";
import { TGGenericErrorResponse } from "../interface/error";

const handleValidationError = (
  err: mongoose.Error.ValidationError
): TGGenericErrorResponse => {
  const errorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return { path: val?.path, message: val?.message };
    }
  );
  const statusCode = 400;
  return {
  
    message: "Validation error",
    errorMessage: err.message,
  };
};

export default handleValidationError;
