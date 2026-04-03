import { z } from "zod";
import dotenv from "dotenv";

// load environment variables from .env file
dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("4000"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  CLIENT_URL: z.string().default("http://localhost:5173"),

  // database
  DATABASE_URL: z.string().optional(), // optional for now

  // later
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
