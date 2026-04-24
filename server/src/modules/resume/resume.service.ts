import { prisma } from "../../config/prisma";
import { SectionType } from "@prisma/client";
import { getFullResume } from "./infrastructure/resume.query";
import { createDuplicateResume } from "./infrastructure/resume.clone";
import { MODEL_MAP } from "./infrastructure/sectionModel.map";
import { assertResumeOwnership } from "./resume.guard";
import type {
  CreateResumeInput,
  UpdateResumeInput,
  UpdateHeaderInput,
  UpdateSettingsInput,
  AddSectionInput,
  UpdateSectionInput,
} from "./resume.schema";

// Resume Service
export const ResumeService = {
  // list
  async list(userId: string) {
    return prisma.resume.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        isPublic: true,
        templateId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  // create
  async create(userId: string, data: CreateResumeInput) {
    return prisma.resume.create({
      data: {
        userId,
        title: data.title,
        templateId: data.templateId,
        header: { create: {} }, // initialise with empty header row
        settings: { create: {} }, // initialise with defaults from schema
      },
      include: {
        header: true,
        settings: true,
        sections: true,
      },
    });
  },

  // get by id
  async getById(resumeId: string, userId: string) {
    await assertResumeOwnership(resumeId, userId);
    return getFullResume(prisma as any, resumeId);
  },

  // update
  async update(resumeId: string, userId: string, data: UpdateResumeInput) {
    await assertResumeOwnership(resumeId, userId);
    return prisma.resume.update({
      where: { id: resumeId },
      data,
    });
  },

  // delete (prisma cascades to every child model)
  async delete(resumeId: string, userId: string) {
    await assertResumeOwnership(resumeId, userId);
    return prisma.resume.delete({ where: { id: resumeId } });
  },

  // duplicate
  async duplicate(resumeId: string, userId: string) {
    await assertResumeOwnership(resumeId, userId);

    return prisma.$transaction(async (tx) => {
      const original = await getFullResume(tx as any, resumeId);
      return createDuplicateResume(tx as any, original, userId);
    });
  },

  // header
  async updateHeader(
    resumeId: string,
    userId: string,
    data: UpdateHeaderInput,
  ) {
    await assertResumeOwnership(resumeId, userId);
    return prisma.resumeHeader.update({
      where: { resumeId },
      data,
    });
  },

  // settings
  async updateSettings(
    resumeId: string,
    userId: string,
    data: UpdateSettingsInput,
  ) {
    await assertResumeOwnership(resumeId, userId);
    return prisma.resumeSettings.update({
      where: { resumeId },
      data,
    });
  },

  // add section
  async addSection(resumeId: string, userId: string, data: AddSectionInput) {
    await assertResumeOwnership(resumeId, userId);
    return prisma.resumeSection.create({
      data: {
        resumeId,
        type: data.type,
        title: data.title,
        position: data.position,
        visible: data.visible,
      },
    });
  },

  // update section
  async updateSection(
    resumeId: string,
    sectionId: string,
    userId: string,
    data: UpdateSectionInput,
  ) {
    await assertResumeOwnership(resumeId, userId);
    return prisma.resumeSection.update({
      where: { id: sectionId },
      data,
    });
  },

  //  delete section
  async deleteSection(resumeId: string, sectionId: string, userId: string) {
    await assertResumeOwnership(resumeId, userId);
    return prisma.resumeSection.delete({ where: { id: sectionId } });
  },

  // add section item
  async addItem(
    resumeId: string,
    sectionId: string,
    userId: string,
    data: Record<string, unknown>,
  ) {
    // verify the section belongs to a resume the user owns
    await assertResumeOwnership(resumeId, userId);

    const section = await prisma.resumeSection.findUnique({
      where: { id: sectionId },
    });
    if (!section || section.resumeId !== resumeId) {
      throw Object.assign(new Error("Section not found."), { statusCode: 404 });
    }

    const model = MODEL_MAP[section.type as SectionType];
    return (prisma[model] as any).create({ data: { sectionId, ...data } });
  },

  // update section item
  async updateItem(
    resumeId: string,
    sectionId: string,
    itemId: string,
    userId: string,
    data: Record<string, unknown>,
  ) {
    await assertResumeOwnership(resumeId, userId);

    const section = await prisma.resumeSection.findUnique({
      where: { id: sectionId },
    });
    if (!section || section.resumeId !== resumeId) {
      throw Object.assign(new Error("Section not found."), { statusCode: 404 });
    }

    const model = MODEL_MAP[section.type as SectionType];
    return (prisma[model] as any).update({
      where: { id: itemId },
      data,
    });
  },

  // delete section item
  async deleteItem(
    resumeId: string,
    sectionId: string,
    itemId: string,
    userId: string,
  ) {
    await assertResumeOwnership(resumeId, userId);

    const section = await prisma.resumeSection.findUnique({
      where: { id: sectionId },
    });
    if (!section || section.resumeId !== resumeId) {
      throw Object.assign(new Error("Section not found."), { statusCode: 404 });
    }

    const model = MODEL_MAP[section.type as SectionType];
    return (prisma[model] as any).delete({ where: { id: itemId } });
  },

  // public share by slug
  async getBySlug(slug: string) {
    const resume = await prisma.resume.findFirst({
      where: { slug, isPublic: true },
      include: {
        header: { include: { socialLinks: true } },
        settings: true,
        template: true,
        sections: {
          where: { visible: true },
          orderBy: { position: "asc" },
          include: {
            experienceItems: { orderBy: { position: "asc" } },
            educationItems: { orderBy: { position: "asc" } },
            projectItems: { orderBy: { position: "asc" } },
            skillItems: { orderBy: { position: "asc" } },
            certificationItems: { orderBy: { position: "asc" } },
            languageItems: { orderBy: { position: "asc" } },
            interestItems: { orderBy: { position: "asc" } },
            referenceItems: { orderBy: { position: "asc" } },
            organizationItems: { orderBy: { position: "asc" } },
            publicationItems: { orderBy: { position: "asc" } },
            awardItems: { orderBy: { position: "asc" } },
            courseItems: { orderBy: { position: "asc" } },
            declarationItems: { orderBy: { position: "asc" } },
            customItems: { orderBy: { position: "asc" } },
          },
        },
      },
    });

    if (!resume) {
      throw Object.assign(new Error("Resume not found."), { statusCode: 404 });
    }

    return resume;
  },
};
