"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jwt_1 = require("../../lib/jwt");
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ success: false, message: "No token provided." });
        return;
    }
    const token = authHeader.split(" ")[1];
    const payload = (0, jwt_1.verifyAccessToken)(token);
    if (!payload) {
        res
            .status(401)
            .json({ success: false, message: "Invalid or expired token." });
        return;
    }
    req.user = {
        userId: payload.userId,
        email: payload.email,
    };
    next();
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.middleware.js.map