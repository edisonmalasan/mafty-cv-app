import { z } from "zod";

// ─── Resume ───────────────────────────────────────────────────────────────────
export const createResumeSchema = z.object({
  body: z.object({
    title: z
      .string({ message: "Title is required." })
      .min(1, "Title cannot be empty.")
      .max(100, "Title must be at most 100 characters."),
    templateId: z.string().uuid("Invalid template ID.").optional(),
  }),
});

export const updateResumeSchema = z.object({
  body: z.object({
    title:      z.string().min(1).max(100).optional(),
    templateId: z.string().uuid().optional(),
    isPublic:   z.boolean().optional(),
  }),
});

// ─── Header ───────────────────────────────────────────────────────────────────
export const updateHeaderSchema = z.object({
  body: z.object({
    namePrefix:        z.string().optional(),
    firstName:         z.string().optional(),
    lastName:          z.string().optional(),
    jobTitle:          z.string().optional(),
    avatarUrl:         z.string().url().optional(),
    email:             z.string().email().optional(),
    phone:             z.string().optional(),
    city:              z.string().optional(),
    country:           z.string().optional(),
    summary:           z.string().optional(),
    // Additional personal details
    passportId:        z.string().optional(),
    nationality:       z.string().optional(),
    dateOfBirth:       z.string().optional(),
    visa:              z.string().optional(),
    availability:      z.string().optional(),
    gender:            z.string().optional(),
    pronoun:           z.string().optional(),
    disability:        z.string().optional(),
    workMode:          z.enum(["REMOTE", "HYBRID", "ON_SITE"]).optional(),
    willingToRelocate: z.boolean().optional(),
    expectedSalary:    z.string().optional(),
    secondPhone:       z.string().optional(),
    drivingLicense:    z.string().optional(),
    securityClearance: z.string().optional(),
    maritalStatus:     z.enum(["SINGLE","MARRIED","DIVORCED","WIDOWED","PREFER_NOT_TO_SAY"]).optional(),
    militaryService:   z.string().optional(),
    smoking:           z.boolean().optional(),
    height:            z.string().optional(),
    weight:            z.string().optional(),
  }),
});

// ─── Settings ─────────────────────────────────────────────────────────────────
export const updateSettingsSchema = z.object({
  body: z.object({
    primaryColor:   z.string().optional(),
    fontFamily:     z.string().optional(),
    fontSize:       z.number().min(8).max(18).optional(),
    lineSpacing:    z.number().min(1).max(2.5).optional(),
    sectionSpacing: z.number().min(0).max(50).optional(),
    paperSize:      z.enum(["A4", "LETTER"]).optional(),
  }),
});

// ─── Sections ─────────────────────────────────────────────────────────────────
const SECTION_TYPES = [
  "EXPERIENCE", "EDUCATION", "PROJECTS", "SKILLS", "CERTIFICATIONS",
  "LANGUAGES", "INTERESTS", "REFERENCES", "ORGANIZATIONS", "PUBLICATIONS",
  "AWARDS", "COURSES", "DECLARATION", "CUSTOM",
] as const;

export const addSectionSchema = z.object({
  body: z.object({
    type:     z.enum(SECTION_TYPES, { message: "Invalid section type." }),
    title:    z.string().optional(),
    position: z.number().int().min(0),
    visible:  z.boolean().default(true),
  }),
});

export const updateSectionSchema = z.object({
  body: z.object({
    title:    z.string().optional(),
    position: z.number().int().min(0).optional(),
    visible:  z.boolean().optional(),
  }),
});

// ─── Inferred Types ───────────────────────────────────────────────────────────
export type CreateResumeInput   = z.infer<typeof createResumeSchema>["body"];
export type UpdateResumeInput   = z.infer<typeof updateResumeSchema>["body"];
export type UpdateHeaderInput   = z.infer<typeof updateHeaderSchema>["body"];
export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>["body"];
export type AddSectionInput     = z.infer<typeof addSectionSchema>["body"];
export type UpdateSectionInput  = z.infer<typeof updateSectionSchema>["body"];
