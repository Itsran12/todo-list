"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const error_middleware_1 = require("../middleware/error-middleware");
const public_api_1 = require("../routes/public-api");
const api_1 = require("../routes/api");
dotenv_1.default.config();
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true
}));
exports.app.use(express_1.default.json());
exports.app.use(public_api_1.publicApi);
exports.app.use(api_1.api);
exports.app.use(error_middleware_1.errorMiddleware);
