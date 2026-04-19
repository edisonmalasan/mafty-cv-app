"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const validate = (schema) => async (req, res, next) => {
    try {
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            res.status(400).json({
                status: "error",
                message: "Validation failed",
                errors: error.issues.map((e) => ({
                    path: e.path.join("."),
                    message: e.message,
                })),
            });
            return;
        }
        return next(error);
    }
};
exports.validate = validate;
//# sourceMappingURL=validate.js.map