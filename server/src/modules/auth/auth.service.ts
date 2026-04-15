import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  issueTokenPair,
  TokenPayload,
} from "../../lib/jwt";
import { prisma } from "../../config/prisma";
import { AuthProvider } from "@prisma/client/edge";
import { redisClient } from "../../config/redis";

const REFRESH_EXPIRES_SECONDS = 7 * 24 * 60 * 60; // 7d
const SALT_ROUNDS = 10;

// strips passwordHash before sending to client
function sanitizeUser(user: {
  passwordHash?: string | null;
  [key: string]: unknown;
}) {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

export const AuthService = {
  async register(data: { email: string; password: string; name?: string }) {
    const { email, password, name } = data;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      const err = new Error(
        "An account with this email already exists.",
      ) as any;
      err.statusCode = 409;
      throw err;
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
        provider: AuthProvider.LOCAL,
      },
    });

    const tokens = issueTokenPair({ userId: user.id, email: user.email });
    return { user: sanitizeUser(user), ...tokens };
  },

  async login(data: { email: string; password: string }) {
    const { email, password } = data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      const err = new Error("Invalid email or password.") as any;
      err.statusCode = 401;
      throw err;
    }

    if (user.provider !== AuthProvider.LOCAL || !user.passwordHash) {
      const err = new Error(
        `This account uses ${user.provider} for login. Please sign in with ${user.provider}.`,
      ) as any;
      err.statusCode = 400;
      throw err;
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      const err = new Error("Invalid email or password.") as any;
      err.statusCode = 401;
      throw err;
    }

    const tokens = issueTokenPair({ userId: user.id, email: user.email });
    return { user: sanitizeUser(user), ...tokens };
  },

  // OAuth upsert
  async loginOrCreate0AuthUser(data: {
    email: string;
    name?: string;
    avatarUrl?: string;
    provider: AuthProvider;
    providerId: string;
  }) {
    const { email, name, avatarUrl, provider, providerId } = data;

    const user = await prisma.user.upsert({
      where: { email },
      update: {
        name,
        avatarUrl,
        providerId,
      },
      create: { email, name, avatarUrl, provider, providerId },
    });
    const tokens = issueTokenPair({ userId: user.id, email: user.email });
    return { user: sanitizeUser(user), ...tokens };
  },

  async refresh(oldRefreshToken: string) {
    // verify the token
    const payload = verifyRefreshToken(oldRefreshToken);
    if (!payload) {
      const err = new Error("Invalid or expired refresh token.") as any;
      err.statusCode = 401;
      throw err;
    }

    // check if the token is blocklisted  (rotated || logged out)
    const blockListed = await redisClient.get(`bl_refresh_${oldRefreshToken}`);
    if (blockListed) {
      const err = new Error("Refresh token has been revoked.") as any;
      err.statusCode = 401;
      throw err;
    }

    // blocklist the old token so it cant be reused
    await redisClient.set(
      `blocklist:${oldRefreshToken}`,
      "1",
      "EX",
      REFRESH_EXPIRES_SECONDS,
    );

    const newTokens = issueTokenPair({
      userId: payload.userId,
      email: payload.email,
    });
    return newTokens;
  },

  async logout(refreshToken: string) {
    const payload = verifyRefreshToken(refreshToken);

    if (payload) {
      await redisClient.set(
        `blocklist:${refreshToken}`,
        "1",
        "EX",
        REFRESH_EXPIRES_SECONDS,
      );
    }
  },

  async getUserById(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        provider: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },
};
