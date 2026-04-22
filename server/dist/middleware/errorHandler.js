"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const env_1 = require("../config/env");
const client_1 = require("@prisma/client");
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    let message = err.message || "Internal Server Error";
    // Handle Prisma errors
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            statusCode = 409;
            message = "A record with this value already exists.";
        }
        else if (err.code === "P2025") {
            statusCode = 404;
            message = "Record not found.";
        }
        else {
            statusCode = 400;
            message = `Database Error`;
        }
    }
    else if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        statusCode = 400;
        message = "Invalid database request.";
    }
    res.status(statusCode).json({
        status: "error",
        message,
        ...(env_1.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map