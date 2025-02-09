import { TodoService } from "../services/todo"
import { CreateTodoRequest, UpdateTodoRequest } from "../models/todo-model"
import { UserRequest } from "../type/types"
import { Response, NextFunction } from "express"

export class TodoController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request = req.body as CreateTodoRequest
            const response = await TodoService.create(req.user!, request)
            res.status(201).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const todoId = req.params.todoId
            const response = await TodoService.get(req.user!, todoId)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async getAll(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const todos = await TodoService.getAll(req.user!)
            res.status(200).json({
                data: todos
            })
        } catch (error) {
            next(error)
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request = req.body as UpdateTodoRequest
            request.id = req.params.id
            const response = await TodoService.update(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async delete(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const todoId = req.params.id
            await TodoService.delete(req.user!, todoId)
            res.status(200).json({
                data: "OK"
            })
        } catch (error) {
            next(error)
        }
    }
}