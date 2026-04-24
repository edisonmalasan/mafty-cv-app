import { prisma } from "../../config/prisma";

export async function assertResumeOwnership(resumeId: string, userId: string) {
  const resume = await prisma.resume.findUnique({
    where: { id: resumeId },
  });

  if (!resume) {
    throw Object.assign(new Error("Resume not found"), { statusCode: 404 });
  }

  if (resume.userId !== userId) {
    throw Object.assign(new Error("Forbidden"), { statusCode: 403 });
  }

  return resume;
}
