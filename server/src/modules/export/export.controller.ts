import { Request, Response } from "express";
import { ExportService } from "./export.service";
import { assertResumeOwnership } from "../resume/resume.guard";

export const queuePdfExport = async (req: Request, res: Response) => {
  try {
    const resumeId = req.params.resumeId as string;

    await assertResumeOwnership(resumeId, req.user!.userId);

    const result = await ExportService.queuePdfExport(
      resumeId,
      req.user!.userId,
    );
    res.json(result);
  } catch (error: any) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
  }
};

export const getExportStatus = async (req: Request, res: Response) => {
  try {
    const status = await ExportService.getJobStatus(req.params.jobId as any);
    res.status(200).json({ success: true, data: status });
  } catch (error: any) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
  }
};
