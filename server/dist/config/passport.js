"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_github2_1 = require("passport-github2");
const client_1 = require("@prisma/client");
const auth_service_1 = require("../modules/auth/auth.service");
const env_1 = require("./env");
//
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: env_1.env.GOOGLE_CLIENT_ID,
    clientSecret: env_1.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",
}, async (_accessToken, _refreshToken, profile, done) => {
    try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
            return done(new Error("No email found in Google profile"));
        }
        const result = await auth_service_1.AuthService.loginOrCreate0AuthUser({
            email,
            name: profile.displayName,
            avatarUrl: profile.photos?.[0]?.value,
            provider: client_1.AuthProvider.GOOGLE,
            providerId: profile.id,
        });
        return done(null, result);
    }
    catch (err) {
        return done(err, undefined);
    }
}));
// github
passport_1.default.use(new passport_github2_1.Strategy({
    clientID: env_1.env.GITHUB_CLIENT_ID,
    clientSecret: env_1.env.GITHUB_CLIENT_SECRET,
    callbackURL: env_1.env.GITHUB_CALLBACK_URL,
    scope: ["user:email"], // request email scope explicitly
}, async (_accessToken, _refreshToken, profile, done) => {
    try {
        // GitHub may return multiple emails — prefer the primary verified one
        const email = profile.emails?.find((e) => e.primary && e.verified)?.value ??
            profile.emails?.[0]?.value;
        if (!email) {
            return done(new Error("No verified email on your GitHub account. Please add one and try again."), undefined);
        }
        const result = await auth_service_1.AuthService.loginOrCreate0AuthUser({
            email,
            name: profile.displayName || profile.username,
            avatarUrl: profile.photos?.[0]?.value,
            provider: client_1.AuthProvider.GITHUB,
            providerId: profile.id,
        });
        return done(null, result);
    }
    catch (error) {
        return done(error, undefined);
    }
}));
exports.default = passport_1.default;
//# sourceMappingURL=passport.js.map