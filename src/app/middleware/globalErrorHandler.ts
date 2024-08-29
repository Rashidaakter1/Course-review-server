import { ErrorRequestHandler } from "express";
import config from "../config";

type TErrorSource = {
  path: string;
  message: string;
};
const globalErrorHandler: ErrorRequestHandler = async (err, req, res, next) => {
  let statusCode = 500;
  let message = err.message || "Something went wrong !";
  let errorSource: TErrorSource = {
    path: "",
    message: "",
  };

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errorSource,
    err,
    stack: (config.NODE__DEV = "development" ? err.stack : null),
  });
};

export default globalErrorHandler;
