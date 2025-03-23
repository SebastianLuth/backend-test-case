import express from "express";
import { router } from "../route";
import { errorMiddleware } from "../middleware/error-middleware";

export const app = express();
app.use(express.json());
app.use(router);
app.use(errorMiddleware);