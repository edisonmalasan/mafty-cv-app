import { prisma } from "../src/config/prisma";

const templates = [
  { name: "Classic", previewUrl: "/previews/classic.png", isPremium: false },
  { name: "Modern", previewUrl: "/previews/modern.png", isPremium: false },
  { name: "Executive", previewUrl: "/previews/executive.png", isPremium: true },
];

async function main() {
  for (const template of templates) {
    await prisma.template.upsert({
      where: { id: template.name.toLowerCase() },
      update: {},
      create: template,
    });
  }
}

main().finally(() => prisma.$disconnect());
