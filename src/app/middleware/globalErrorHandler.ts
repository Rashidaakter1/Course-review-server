import { ErrorRequestHandler } from "express";
import config from "../config";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import AppError from "../errors/AppError";

const globalErrorHandler: ErrorRequestHandler = async (err, req, res, next) => {
  let message = err.message || "Something went wrong !";
  let errorMessage = err.message || "Something went wrong !";
  let errorDetails;
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    errorDetails = err;
    (message = simplifiedError.message),
      (errorMessage = simplifiedError.errorMessage);
  } else if (err.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    errorDetails = err.errors;
    message = simplifiedError?.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (err.name === "CastError") {
    const simplifiedError = handleCastError(err);
    errorDetails = err;
    message = simplifiedError?.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (err.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    message = simplifiedError?.message;
    errorMessage = simplifiedError.errorMessage;
    errorDetails = err;
  } else if (err instanceof AppError) {
    message = err.message;
    errorDetails = err;
  } else if (err instanceof Error) {
    message = err.message;
    errorDetails = err;
  }

  return res.status(400).json({
    success: false,
    message,
    errorMessage,
    errorDetails,
    stack: (config.NODE__DEV = "development" ? err.stack : null),
  });
};

export default globalErrorHandler;
