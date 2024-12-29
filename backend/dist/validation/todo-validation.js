"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoValidation = void 0;
const zod_1 = require("zod");
class TodoValidation {
}
exports.TodoValidation = TodoValidation;
TodoValidation.CREATE = zod_1.z.object({
    title: zod_1.z.string().min(1).max(200),
    description: zod_1.z.string().min(1).max(1000).optional(),
    isCompleted: zod_1.z.boolean().optional()
});
TodoValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.string().min(1, "Address ID is required"),
    title: zod_1.z.string().min(1).max(200).optional(),
    description: zod_1.z.string().min(1).max(1000).optional(),
    isCompleted: zod_1.z.boolean().optional()
});
