import { Router } from "express";
import { authenticate } from "../auth/auth.middleware";
import { queuePdfExport, getExportStatus } from "./export.controller";

const router = Router();

router.use(authenticate); // all routes require authentication

router.post("/:resumeId/pdf", queuePdfExport); // returm jobId
router.get("/:jobId/status", getExportStatus); // return { status, fileUrl }

export default router;
