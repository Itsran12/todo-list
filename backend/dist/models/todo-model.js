"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTodoResponse = toTodoResponse;
function toTodoResponse(todo) {
    return {
        title: todo.title,
        description: todo.description,
        isCompleted: todo.isCompleted
    };
}
