import { prisma } from "../../config/prisma";

export const TemplateService = {
  async list() {
    return prisma.template.findMany({ orderBy: { name: "asc" } });
  },

  async getById(id: string) {
    return prisma.template.findUniqueOrThrow({ where: { id } });
  },
};
