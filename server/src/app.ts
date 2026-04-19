import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env";
import { errorHandler } from "./middleware/errorHandler";
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/user/user.routes";

const app = express();

// security headers
app.use(helmet());

// cors
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true, // for cookies
  }),
);

// logging of requests in dev
if (env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// health check endpoint
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "ok", message: "server is running" });
});

// global error handler
app.use(errorHandler);

export { app };
