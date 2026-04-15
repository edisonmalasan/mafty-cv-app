import { Redis } from "ioredis";

const REDIS_URL = process.env.REDIS_URL;

if (!REDIS_URL) {
  throw new Error("REDIS_URL is not set in environment variables.");
}

export const redisClient = new Redis(REDIS_URL);

redisClient.on("error", (err) => {
  console.error("[Redis] Connection error:", err);
});
