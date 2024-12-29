import { prismaClient } from "../src/app/database"
import { User, Todo } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export class UserTest {
    static async delete() {
        await prismaClient.user.deleteMany({
            where: {
                email: "example@gmail.com"
            }
        })
    }

    static async create() {
        const user = await prismaClient.user.create({
            data: {
                username: "example",
                email: "example@gmail.com",
                password: await bcrypt.hash("example", 10)
            }
        })

        const token = jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email
        }, process.env.JWT_SECRET_KEY! , { expiresIn: "1d" })
        
        const updateUser = await prismaClient.user.update({
            where: {
                id: user.id
            },
            data: {
                token: token
            }
        })

        return updateUser
    }

    static async get(): Promise<User> {
        const user = await prismaClient.user.findFirst({
            where: {
                email: "example@gmail.com"
            }
        })

        if(!user) {
            throw new Error("User not found")
        }

        return user
    }
}

export class TodoTest {
    static async delete() {
        await prismaClient.todo.deleteMany({
            where: {
                user: {
                    email: "example@gmail.com"
                }
            }
        })
    }

    static async create(userId: string, data: Partial<{ title: string; description: string; isCompleted: boolean }> = {}) {
        await prismaClient.todo.create({
            data: {
                title: data.title || "test",
                description: data.description || "test",
                isCompleted: data.isCompleted ?? false,
                user: {
                    connect: {
                        id: userId,
                    }
                }
            }
        })
    }

    static async get(userId: string): Promise<Todo> {
        const todo = await prismaClient.todo.findFirst({
            where: {
                userId: userId
            }
        })

        if(!todo) {
            throw new Error("Todo not found")
        }

        return todo
    }
}