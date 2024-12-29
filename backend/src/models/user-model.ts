import { User } from "@prisma/client"

export type UserResponse = {
    username: string
    email: string
    token: string
}

export type CreateUserRequest = {
    username: string
    email: string
    password: string
}

export type UpdateUserRequest = {
    username?: string
    password?: string
}

export type LoginUserRequest = {
    email: string
    password: string
}

export function toUserResponse(user: User): UserResponse {
    return {
        username: user.username,
        email: user.email,
        token: user.token!
    }
}