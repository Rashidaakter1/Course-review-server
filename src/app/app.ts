import express, { Request, Response } from "express";
import cors from "cors";
import router from "./routes";
import notFound from "./middleware/notFound";
import globalErrorHandler from "./middleware/globalErrorHandler";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! !!");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
