"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const ioredis_1 = require("ioredis");
const REDIS_URL = process.env.REDIS_URL;
if (!REDIS_URL) {
    throw new Error("REDIS_URL is not set in environment variables.");
}
exports.redisClient = new ioredis_1.Redis(REDIS_URL);
exports.redisClient.on("error", (err) => {
    console.error("[Redis] Connection error:", err);
});
//# sourceMappingURL=redis.js.map