import { Redis } from "ioredis";
import { env } from "./env";

const REDIS_URL = env.REDIS_URL;

if (!REDIS_URL) {
  throw new Error("REDIS_URL is not set in environment variables.");
}

export const redisClient = new Redis(REDIS_URL);

redisClient.on("error", (err) => {
  console.error("[Redis] Connection error:", err);
});
