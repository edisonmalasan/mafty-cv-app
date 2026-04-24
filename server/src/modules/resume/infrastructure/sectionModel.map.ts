import { prisma } from "../../../config/prisma";
import { SectionType, PrismaClient } from "@prisma/client";

export const MODEL_MAP: Record<SectionType, keyof PrismaClient> = {
  EXPERIENCE: "experienceItem",
  EDUCATION: "educationItem",
  PROJECTS: "projectItem",
  SKILLS: "skillItem",
  CERTIFICATIONS: "certificationItem",
  LANGUAGES: "languageItem",
  INTERESTS: "interestItem",
  REFERENCES: "referenceItem",
  ORGANIZATIONS: "organizationItem",
  PUBLICATIONS: "publicationItem",
  AWARDS: "awardItem",
  COURSES: "courseItem",
  DECLARATION: "declarationItem",
  CUSTOM: "customItem",
};
