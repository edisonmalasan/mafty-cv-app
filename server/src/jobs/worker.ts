import { Worker } from "bullmq";
import { redisClient } from "../config/redis";
import { processPdfExportJob } from "./processors/pdfExport";

const worker = new Worker("pdf-export", processPdfExportJob, {
  connection: redisClient,
  concurrency: 1, // max 1 PDFs at a time
});

worker.on("completed", (job) => {
  console.log(`[Worker] Job ${job.id} completed`);
});
worker.on("failed", (job, err) => {
  console.error(`[Worker] Job ${job?.id} failed:`, err.message);
});
