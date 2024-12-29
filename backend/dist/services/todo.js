"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const todo_model_1 = require("../models/todo-model");
const validation_1 = require("../validation/validation");
const todo_validation_1 = require("../validation/todo-validation");
const database_1 = require("../app/database");
const response_error_1 = require("../error/response-error");
class TodoService {
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.Validate(todo_validation_1.TodoValidation.CREATE, request);
            if (!user) {
                throw new response_error_1.ResponseError(400, "User not found");
            }
            const record = Object.assign(Object.assign({}, createRequest), { userId: user.id });
            const result = yield database_1.prismaClient.todo.create({
                data: record
            });
            return (0, todo_model_1.toTodoResponse)(result);
        });
    }
    static checkTodoMustBeExist(userId, todoid) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield database_1.prismaClient.todo.findFirst({
                where: {
                    id: todoid,
                    userId: userId
                }
            });
            if (!todo) {
                throw new response_error_1.ResponseError(400, "Todo not found");
            }
            return todo;
        });
    }
    static get(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield this.checkTodoMustBeExist(user.id, id);
            return (0, todo_model_1.toTodoResponse)(todo);
        });
    }
    static getAll(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const todos = yield database_1.prismaClient.todo.findMany({
                where: {
                    userId: user.id
                }
            });
            return todos.map(todo_model_1.toTodoResponse);
        });
    }
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.Validate(todo_validation_1.TodoValidation.UPDATE, request);
            const todo = yield database_1.prismaClient.todo.update({
                where: {
                    id: updateRequest.id
                },
                data: Object.assign(Object.assign({}, updateRequest), { userId: user.id })
            });
            return (0, todo_model_1.toTodoResponse)(todo);
        });
    }
    static delete(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkTodoMustBeExist(user.id, id);
            const result = yield database_1.prismaClient.todo.delete({
                where: {
                    id: id,
                    userId: user.id
                }
            });
            return (0, todo_model_1.toTodoResponse)(result);
        });
    }
}
exports.TodoService = TodoService;
