import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env";
import { errorHandler } from "./middleware/errorHandler";
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/user/user.routes";
import templateRoutes from "./modules/template/template.routes";
import resumeRoutes, {
  publicResumeRouter,
} from "./modules/resume/resume.routes";
import { prisma } from "./config/prisma";
import { redisClient } from "./config/redis";

const app = express();

// ── Security & Parsing ──────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
if (env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// ── Routes ──────────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/resumes", resumeRoutes); // protected — authenticate is applied inside the router
app.use("/api/r", publicResumeRouter); // public share links — no auth

// ── Health Check ────────────────────────────────────────────────────────────
app.get("/api/health", async (_req: Request, res: Response) => {
  await Promise.all([prisma.$queryRaw`SELECT 1`, redisClient.ping()]);
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── Global Error Handler (must be last) ─────────────────────────────────────
app.use(errorHandler);

export { app };
