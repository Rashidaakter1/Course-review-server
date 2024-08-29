import { Response } from "express";

type TGenericResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
};

const sendRequest = <T>(res: Response, result: TGenericResponse<T>) => {
  res.status(result.statusCode).json({
    success: result.success,
    statusCode: result.statusCode,
    message: result.message,
    data: result.data,
  });
};

export default sendRequest;
