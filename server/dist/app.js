"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const env_1 = require("./config/env");
const app = (0, express_1.default)();
exports.app = app;
// --- Core Middlewares ---
// Security headers
app.use((0, helmet_1.default)());
// Cross-Origin Resource Sharing
app.use((0, cors_1.default)({
    origin: env_1.env.CLIENT_URL,
    credentials: true, // Needed if you use cookies later
}));
// Logging HTTP requests
if (env_1.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
// Parse incoming request bodies with JSON payloads
app.use(express_1.default.json());
// --- Routes ---
// Health check route to ensure the server is responding
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", message: "Server is up and running" });
});
//# sourceMappingURL=app.js.map