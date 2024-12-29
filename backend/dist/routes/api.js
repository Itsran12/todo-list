"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth-middleware");
const user_controller_1 = require("../controllers/user-controller");
const todo_controller_1 = require("../controllers/todo-controller");
exports.api = express_1.default.Router();
exports.api.use(auth_middleware_1.authMiddleware);
// API USERS
exports.api.patch("/api/users", user_controller_1.UserController.update);
exports.api.get("/api/users", user_controller_1.UserController.get);
exports.api.delete("/api/logout", user_controller_1.UserController.logout);
// API TODOS
exports.api.post("/api/todos", todo_controller_1.TodoController.create);
exports.api.get("/api/todos/:id", todo_controller_1.TodoController.get);
exports.api.get("/api/todos", todo_controller_1.TodoController.getAll);
exports.api.patch("/api/todos/:id", todo_controller_1.TodoController.update);
exports.api.delete("/api/todos/:id", todo_controller_1.TodoController.delete);
