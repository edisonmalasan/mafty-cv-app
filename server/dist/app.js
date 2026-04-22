"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const env_1 = require("./config/env");
const errorHandler_1 = require("./middleware/errorHandler");
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const app = (0, express_1.default)();
exports.app = app;
// security headers
app.use((0, helmet_1.default)());
// cors
app.use((0, cors_1.default)({
    origin: env_1.env.CLIENT_URL,
    credentials: true, // for cookies
}));
// logging of requests in dev
if (env_1.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// routes
app.use("/api/auth", auth_routes_1.default);
// health check endpoint
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "server is running" });
});
// global error handler must be the very last middleware
app.use(errorHandler_1.errorHandler);
//# sourceMappingURL=app.js.map