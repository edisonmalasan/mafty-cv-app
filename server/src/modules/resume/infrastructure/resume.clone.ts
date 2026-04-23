import { PrismaClient } from "@prisma/client";

// ─── Helpers ──────────────────────────────────────────────────────────────────
// Strip Prisma-managed fields so Prisma creates new rows instead of upserting.
function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) delete result[key];
  return result;
}

const PRISMA_FIELDS = ["id", "createdAt", "updatedAt"] as const;
const strip = (obj: any) => omit(obj, [...PRISMA_FIELDS]);

// ─── Header ───────────────────────────────────────────────────────────────────
function cloneHeader(header: any) {
  if (!header) return undefined;

  return {
    create: {
      ...strip(omit(header, ["resumeId", "id", "createdAt", "updatedAt"])),
      socialLinks: {
        create: (header.socialLinks ?? []).map((link: any) =>
          omit(link, ["id", "headerId"]),
        ),
      },
    },
  };
}

// ─── Settings ─────────────────────────────────────────────────────────────────
function cloneSettings(settings: any) {
  if (!settings) return undefined;
  return { create: strip(omit(settings, ["resumeId"])) };
}

// ─── Section items ────────────────────────────────────────────────────────────
const SECTION_ITEM_RELATIONS = [
  "experienceItems",
  "educationItems",
  "projectItems",
  "skillItems",
  "certificationItems",
  "languageItems",
  "interestItems",
  "referenceItems",
  "organizationItems",
  "publicationItems",
  "awardItems",
  "courseItems",
  "declarationItems",
  "customItems",
] as const;

function cloneSectionItems(section: any) {
  const items: Record<string, { create: any[] }> = {};

  for (const relation of SECTION_ITEM_RELATIONS) {
    const list: any[] = section[relation] ?? [];
    if (list.length > 0) {
      items[relation] = {
        create: list.map((item: any) => strip(omit(item, ["sectionId"]))),
      };
    }
  }

  return items;
}

// ─── Sections ─────────────────────────────────────────────────────────────────
function cloneSections(sections: any[]) {
  return {
    create: sections.map((section) => ({
      type: section.type,
      title: section.title,
      position: section.position,
      visible: section.visible,
      ...cloneSectionItems(section),
    })),
  };
}

// ─── Public API ───────────────────────────────────────────────────────────────
export async function createDuplicateResume(
  tx: Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">,
  original: any,
  userId: string,
) {
  return tx.resume.create({
    data: {
      userId,
      title: `${original.title} (Copy)`,
      templateId: original.templateId ?? undefined,
      isPublic: false, // copies are always private
      ...(original.header   && { header:   cloneHeader(original.header) }),
      ...(original.settings && { settings: cloneSettings(original.settings) }),
      ...(original.sections?.length && { sections: cloneSections(original.sections) }),
    },
    include: {
      header:   { include: { socialLinks: true } },
      settings: true,
      sections: true,
    },
  });
}
