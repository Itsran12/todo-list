import { CreateTodoRequest, UpdateTodoRequest, TodoResponse, toTodoResponse } from "../models/todo-model"
import { Validation } from "../validation/validation"
import { TodoValidation } from "../validation/todo-validation"
import { prismaClient } from "../app/database"
import { ResponseError } from "../error/response-error"
import { Todo, User } from "@prisma/client"

export class TodoService {
    static async create(user: User, request: CreateTodoRequest): Promise<TodoResponse> {
        const createRequest = Validation.Validate(TodoValidation.CREATE, request)
        if(!user) {
            throw new ResponseError(400, "User not found")
        }

        const record = {
            ...createRequest,
            ...{userId: user.id}
        }

        const result = await prismaClient.todo.create({
            data: record
        })

        return toTodoResponse(result)
    }


    static async checkTodoMustBeExist(userId: string, todoid: string): Promise<Todo> {
        const todo = await prismaClient.todo.findFirst({
            where: {
                id: todoid,
                userId: userId
            }
        })

        if(!todo) {
            throw new ResponseError(400, "Todo not found")
        }

        return todo
    }

    static async get(user: User, id: string): Promise<TodoResponse> {
        const todo = await this.checkTodoMustBeExist(user.id, id)
        return toTodoResponse(todo)
    }

    static async getAll(user: User): Promise<TodoResponse[]> {
        const todos = await prismaClient.todo.findMany({
            where: {
                userId: user.id
            }
        })

        return todos.map(toTodoResponse)
    }

    static async update(user: User, request: UpdateTodoRequest): Promise<TodoResponse> {
        const updateRequest = Validation.Validate(TodoValidation.UPDATE, request)
        const todo = await prismaClient.todo.update({
            where: {
                id: updateRequest.id
            },
            data: {
                ...updateRequest,
                userId: user.id
            }
        })

        return toTodoResponse(todo)
    }

    static async delete(user: User, id: string): Promise<TodoResponse> {
        await this.checkTodoMustBeExist(user.id, id)
        const result = await prismaClient.todo.delete({
            where: {
                id: id,
                userId: user.id
            }
        })

        return toTodoResponse(result)
    }
}