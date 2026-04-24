import { Queue } from "bullmq";
import { redisClient } from "../../config/redis";

export const exportQueue = new Queue("pdf-export", {
  connection: redisClient,
});

export async function enqueuePdfExport(resumeId: string, userId: string) {
  return exportQueue.add(
    "generate-pdf",
    { resumeId, userId },
    {
      attempts: 3,
      backoff: { type: "exponential", delay: 2000 },
    },
  );
}
