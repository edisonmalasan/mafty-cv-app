import bcrypt from "bcrypt";
import {
  generateToken,
  generateRefreshToken,
  verifyToken,
  verifyRefreshToken,
} from "../../lib/jwt";
import { prisma } from "../../config/prisma";

export const AuthService = {
  async register(data: { email: string; password: string; name?: string }) {
    const { email, password, name } = data;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    // check user
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    let passwordHash: string | null = null;

    if (password) {
      const saltRounds = 10;
      passwordHash = await bcrypt.hash(password, saltRounds);
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
        provider: "LOCAL",
      },
    });

    const token = generateToken({ userId: newUser.id, email: newUser.email });

    const { passwordHash: _, ...safeUser } = newUser;
    return { user: safeUser, token };
  },

  async login(data: { email: string; password: string }) {
    const { email, password } = data;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    if (user.provider !== "LOCAL" || !user.passwordHash) {
      throw new Error(`Please login using your ${user.provider} account.`);
    }

    if (!password) {
      throw new Error("Password is required");
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      throw new Error("Invalid email or password");
    }

    const token = generateToken({ userId: user.id, email: user.email });
    const refreshToken = generateRefreshToken({
      userId: user.id,
      email: user.email,
    });

    const { passwordHash: _, ...safeUser } = user;
    return { user: safeUser, token, refreshToken };
  },

  async getUserById(userId: string) {
    const user = await prisma.user.findUnique({
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
    return user;
  },
};
