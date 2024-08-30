import { ZodError, ZodIssue } from "zod";
import {  TGGenericErrorResponse } from "../interface/error";

const handleZodError = (err: ZodError): TGGenericErrorResponse => {
  const singleMessage = err.issues.map((issue: ZodIssue) => {
    return {
      message: issue.message,
    };
  });

  let errorMessage = singleMessage.map((val) => val.message);
  let errorMessageInStr = `${errorMessage.join()}`.toString();

  const statusCode = 400;

  return {
    
    message: "Validation Error",
    errorMessage: errorMessageInStr,
  };
};

export default handleZodError;
