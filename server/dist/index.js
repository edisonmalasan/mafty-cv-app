"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const env_1 = require("./config/env");
const startServer = async () => {
    try {
        app_1.app.listen(env_1.env.PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${env_1.env.PORT}`);
            console.log(`🌍 Environment: ${env_1.env.NODE_ENV}`);
        });
    }
    catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=index.js.map