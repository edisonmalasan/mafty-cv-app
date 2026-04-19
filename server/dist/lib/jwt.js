"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = generateAccessToken;
exports.generateRefreshToken = generateRefreshToken;
exports.verifyAccessToken = verifyAccessToken;
exports.verifyRefreshToken = verifyRefreshToken;
exports.issueTokenPair = issueTokenPair;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const ACCESS_EXPIRES = (process.env.JWT_ACCESS_EXPIRES ||
    "15m");
const REFRESH_EXPIRES = (process.env.JWT_REFRESH_EXPIRES ||
    "7d");
if (!ACCESS_SECRET || !REFRESH_SECRET) {
    throw new Error("JWT secrets are not set in environment variables.");
}
function generateAccessToken(payload) {
    return jsonwebtoken_1.default.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES });
}
function generateRefreshToken(payload) {
    return jsonwebtoken_1.default.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES });
}
function verifyAccessToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, ACCESS_SECRET);
    }
    catch {
        return null;
    }
}
function verifyRefreshToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, REFRESH_SECRET);
    }
    catch {
        return null;
    }
}
// generates both tokens and sets refresh in httpOnly cookie
function issueTokenPair(payload) {
    return {
        accessToken: generateAccessToken(payload),
        refreshToken: generateRefreshToken(payload),
    };
}
//# sourceMappingURL=jwt.js.map