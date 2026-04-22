import { prisma } from "../../config/prisma";
import { UpdateUserInput } from "./user.schema";
import { uploadToSupabase } from "../../lib/storage";

export const UserService = {
  async getMe(userId: string) {
    return prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        provider: true,
      },
    });
  },

  async updateMe(userId: string, data: UpdateUserInput) {
    return prisma.user.update({
      where: { id: userId },
      data,
    });
  },

  async uploadAvatar(userId: string, fileBuffer: Buffer, mimeType: string) {
    const url = await uploadToSupabase(
      fileBuffer,
      mimeType,
      `avatars/${userId}`,
    );

    return prisma.user.update({
      where: { id: userId },
      data: { avatarUrl: url },
    });
  },

  async deleteMe(userId: string) {
    return prisma.user.delete({
      where: { id: userId },
    });
  },
};
