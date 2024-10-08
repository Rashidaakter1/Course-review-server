import express, { Request, Response } from "express";
import cors from "cors";
import router from "./routes";
import notFound from "./middleware/notFound";
import globalErrorHandler from "./middleware/globalErrorHandler";
import sendRequest from "./utils/sendResponse";
import httpStatus from "http-status";
import cookieParser from "cookie-parser"

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  sendRequest(res, {
    success: true,
    message: "Yahooo , server is running now",
    statusCode: httpStatus.OK,
    data: null,
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
