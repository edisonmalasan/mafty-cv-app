"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLogout = exports.handleRefreshToken = exports.handleLogin = exports.handleRegister = void 0;
const auth_service_1 = require("./auth.service");
const REFRESH_COOKIE = "refreshToken";
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
};
const handleRegister = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const { user, accessToken, refreshToken } = await auth_service_1.AuthService.register({
            email,
            password,
            name,
        });
        res.cookie(REFRESH_COOKIE, refreshToken, COOKIE_OPTIONS);
        res.status(201).json({ success: true, data: { user, accessToken } });
    }
    catch (error) {
        res
            .status(error.statusCode || 400)
            .json({ success: false, message: error.message });
    }
};
exports.handleRegister = handleRegister;
const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, accessToken, refreshToken } = await auth_service_1.AuthService.login({
            email,
            password,
        });
        res.cookie(REFRESH_COOKIE, refreshToken, COOKIE_OPTIONS);
        res.status(200).json({ success: true, data: { user, accessToken } });
    }
    catch (error) {
        res
            .status(error.statusCode || 400)
            .json({ success: false, message: error.message });
    }
};
exports.handleLogin = handleLogin;
const handleRefreshToken = async (req, res) => {
    try {
        // read from httpOnly cookie
        const oldRefreshToken = req.cookies[REFRESH_COOKIE];
        if (!oldRefreshToken) {
            res
                .status(401)
                .json({ success: false, message: "No refresh token provided." });
            return;
        }
        const { accessToken, refreshToken } = await auth_service_1.AuthService.refresh(oldRefreshToken);
        // set new refresh token in cookie & overwrite old one
        res.cookie(REFRESH_COOKIE, refreshToken, COOKIE_OPTIONS);
        res.status(200).json({ success: true, data: { accessToken } });
    }
    catch (error) {
        res
            .status(error.statusCode || 400)
            .json({ success: false, message: error.message });
    }
};
exports.handleRefreshToken = handleRefreshToken;
const handleLogout = async (req, res) => {
    try {
        const refreshToken = req.cookies?.[REFRESH_COOKIE];
        if (refreshToken) {
            await auth_service_1.AuthService.logout(refreshToken);
        }
        res.clearCookie(REFRESH_COOKIE, COOKIE_OPTIONS);
        res
            .status(200)
            .json({ success: true, message: "Logged out successfully." });
    }
    catch (error) {
        res
            .status(error.statusCode || 500)
            .json({ success: false, message: error.message });
    }
};
exports.handleLogout = handleLogout;
//# sourceMappingURL=auth.controller.js.map