import { PrismaClient } from "@prisma/client";

export async function getFullResume(tx: PrismaClient, resumeId: string) {
  return tx.resume.findUniqueOrThrow({
    where: { id: resumeId },
    include: {
      header: {
        include: { socialLinks: true },
      },
      settings: true,
      sections: {
        include: {
          experienceItems: true,
          educationItems: true,
          projectItems: true,
          skillItems: true,
          certificationItems: true,
          languageItems: true,
          interestItems: true,
          referenceItems: true,
          organizationItems: true,
          publicationItems: true,
          awardItems: true,
          courseItems: true,
          declarationItems: true,
          customItems: true,
        },
      },
    },
  });
}
