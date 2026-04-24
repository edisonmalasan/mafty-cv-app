import puppeteer from "puppeteer";
import { uploadToSupabase } from "../../lib/storage";
import { prisma } from "../../config/prisma";
import { env } from "../../config/env";
import { Job } from "bullmq/dist/esm/classes/job";

export async function processPdfExportJob(
  job: Job<{ resumeId: string; userId: string }>,
) {
  const { resumeId } = job.data;

  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();

  await page.goto(`${env.CLIENT_URL}/rr/${resumeId}?print=true`, {
    waitUntil: "networkidle0",
  });

  const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
  await browser.close();

  const fileUrl = await uploadToSupabase(
    Buffer.from(pdfBuffer),
    "application/pdf",
    `exports/${resumeId}-${Date.now()}.pdf`,
  );

  // persis export record
  await prisma.export.create({
    data: { resumeId, fileUrl, format: "PDF" },
  });

  return { fileUrl };
}
