import express, { Request, Response } from "express";
import cors from "cors";
import { env } from "./config/env";
import helmet from "helmet";
import morgan from "morgan";

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

// health check endpoint
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "ok", message: "server is running" });
});

export { app };
