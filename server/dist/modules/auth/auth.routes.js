"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
router.post("/register", auth_controller_1.handleRegister);
router.post("/login", auth_controller_1.handleLogin);
router.post("/refresh-token", auth_controller_1.handleRefreshToken); // will be read on http cookie
router.post("/logout", auth_controller_1.handleLogout);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map