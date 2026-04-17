import { z } from "zod";
import dotenv from "dotenv";

// load env
dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("4000"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  CLIENT_URL: z.string().default("http://localhost:5173"),

  // database
  DATABASE_URL: z.string().optional(), // optionakl because prisma can also read from .env directly

  // oauth
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  GITHUB_CALLBACK_URL: z.string(),

  // later can add more env vars likke JWT secrets, Redis URL, etc.
  // JWT_ACCESS_SECRET: z.string(),
  // REDIS_URL: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("Invalid environment variables:");
  console.error(_env.error.format());
  process.exit(1);
}

export const env = _env.data;
