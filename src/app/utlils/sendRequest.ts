import { Response } from "express";

type TGenericResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};

const sendRequest = <T>(res: Response, result: TGenericResponse<T>) => {
  res.status(result.statusCode).json({
    success: result.success,
    statusCode: result.statusCode,
    message: result.message,
    meta: result.meta,
    data: result.data,
  });
};

export default sendRequest;
