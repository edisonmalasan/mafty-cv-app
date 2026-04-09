import { start } from "node:repl";
import { app } from "./app";
import { env } from "./config/env";

const startServer = () => {
  try {
    app.listen(env.PORT || 3000, () => {
      console.log(`Server is running on http://localhost:${env.PORT || 3000}`);
      console.log(`Environment: ${env.NODE_ENV}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
