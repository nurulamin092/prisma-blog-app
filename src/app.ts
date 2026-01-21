import express, { Application } from "express";
import { toNodeHandler } from "better-auth/node";
import { postRouter } from "./modules/post/post.router";
import { auth } from "./lib/auth";
import cors from "cors";
import { commentRouter } from "./modules/comment/comment.router";
import errorHandler from "./middleware/globalErrorHandler";
const app: Application = express();

app.use(
  cors({
    origin: process.env.APP_URL,
    credentials: true,
  })
);
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.use(errorHandler);
export default app;
