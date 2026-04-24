import { exportQueue, enqueuePdfExport } from "./export.queue";

export const ExportService = {
  async queuePdfExport(resumeId: string, userId: string) {
    const job = await enqueuePdfExport(resumeId, userId);
    return { jobId: job.id };
  },

  async getJobStatus(jobId: string) {
    const job = await exportQueue.getJob(jobId);
    if (!job) throw Object.assign(new Error("Job not found"), { status: 404 });
    const state = await job.getState();
    return {
      jobId,
      status: state,
      fileUrl: state === "completed" ? job.returnvalue?.fileUrl : null,
      error: state === "failed" ? job.failedReason : null,
    };
  },
};
