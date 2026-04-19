"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../../lib/jwt");
const prisma_1 = require("../../config/prisma");
const edge_1 = require("@prisma/client/edge");
const redis_1 = require("../../config/redis");
const REFRESH_EXPIRES_SECONDS = 7 * 24 * 60 * 60; // 7d
const SALT_ROUNDS = 10;
// strips passwordHash before sending to client
function sanitizeUser(user) {
    const { passwordHash, ...safeUser } = user;
    return safeUser;
}
exports.AuthService = {
    async register(data) {
        const { email, password, name } = data;
        const existing = await prisma_1.prisma.user.findUnique({ where: { email } });
        if (existing) {
            const err = new Error("An account with this email already exists.");
            err.statusCode = 409;
            throw err;
        }
        const passwordHash = await bcrypt_1.default.hash(password, SALT_ROUNDS);
        const user = await prisma_1.prisma.user.create({
            data: {
                email,
                name,
                passwordHash,
                provider: edge_1.AuthProvider.LOCAL,
            },
        });
        const tokens = (0, jwt_1.issueTokenPair)({ userId: user.id, email: user.email });
        return { user: sanitizeUser(user), ...tokens };
    },
    async login(data) {
        const { email, password } = data;
        const user = await prisma_1.prisma.user.findUnique({ where: { email } });
        if (!user) {
            const err = new Error("Invalid email or password.");
            err.statusCode = 401;
            throw err;
        }
        if (user.provider !== edge_1.AuthProvider.LOCAL || !user.passwordHash) {
            const err = new Error(`This account uses ${user.provider} for login. Please sign in with ${user.provider}.`);
            err.statusCode = 400;
            throw err;
        }
        const valid = await bcrypt_1.default.compare(password, user.passwordHash);
        if (!valid) {
            const err = new Error("Invalid email or password.");
            err.statusCode = 401;
            throw err;
        }
        const tokens = (0, jwt_1.issueTokenPair)({ userId: user.id, email: user.email });
        return { user: sanitizeUser(user), ...tokens };
    },
    // OAuth upsert
    async loginOrCreate0AuthUser(data) {
        const { email, name, avatarUrl, provider, providerId } = data;
        const user = await prisma_1.prisma.user.upsert({
            where: { email },
            update: {
                name,
                avatarUrl,
                providerId,
            },
            create: { email, name, avatarUrl, provider, providerId },
        });
        const tokens = (0, jwt_1.issueTokenPair)({ userId: user.id, email: user.email });
        return { user: sanitizeUser(user), ...tokens };
    },
    async refresh(oldRefreshToken) {
        // verify the token
        const payload = (0, jwt_1.verifyRefreshToken)(oldRefreshToken);
        if (!payload) {
            const err = new Error("Invalid or expired refresh token.");
            err.statusCode = 401;
            throw err;
        }
        // check if the token is blocklisted  (rotated || logged out)
        const blockListed = await redis_1.redisClient.get(`bl_refresh_${oldRefreshToken}`);
        if (blockListed) {
            const err = new Error("Refresh token has been revoked.");
            err.statusCode = 401;
            throw err;
        }
        // blocklist the old token so it cant be reused
        await redis_1.redisClient.set(`blocklist:${oldRefreshToken}`, "1", "EX", REFRESH_EXPIRES_SECONDS);
        const newTokens = (0, jwt_1.issueTokenPair)({
            userId: payload.userId,
            email: payload.email,
        });
        return newTokens;
    },
    async logout(refreshToken) {
        const payload = (0, jwt_1.verifyRefreshToken)(refreshToken);
        if (payload) {
            await redis_1.redisClient.set(`blocklist:${refreshToken}`, "1", "EX", REFRESH_EXPIRES_SECONDS);
        }
    },
    async getUserById(userId) {
        return prisma_1.prisma.user.findUnique({
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
//# sourceMappingURL=auth.service.js.map