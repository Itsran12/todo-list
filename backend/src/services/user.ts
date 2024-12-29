import { CreateUserRequest, UpdateUserRequest, LoginUserRequest, UserResponse, toUserResponse } from "../models/user-model"
import { Validation } from "../validation/validation"
import { UserValidation } from "../validation/user-validation"
import { prismaClient } from "../app/database"
import { ResponseError } from "../error/response-error"
import { User } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export class UserService {
    static async register(request: CreateUserRequest): Promise<UserResponse> {
        const registerRequest = Validation.Validate(UserValidation.REGISTER, request)
        const emailExists = await prismaClient.user.findUnique({
            where: {
                email: registerRequest.email
            }
        })

        if(emailExists) {
            throw new ResponseError(400, "Email already exists")
        }

        const hashedPassword = await bcrypt.hash(registerRequest.password, 10)
        const createUser = await prismaClient.user.create({
            data: {
                username: registerRequest.username,
                email: registerRequest.email,
                password: hashedPassword
            }
        })

        return toUserResponse(createUser)
    }

    static async get(user: User): Promise<UserResponse> {
        return toUserResponse(user)
    }

    static async update(user: User, request: UpdateUserRequest): Promise<UserResponse> {
        const updateRequest = Validation.Validate(UserValidation.UPDATE, request)
        const updateData: any = {}
        if(updateRequest.username) {
            updateData.username = updateRequest.username
        }

        if(updateRequest.password) {
            updateData.password = await bcrypt.hash(updateRequest.password, 10)
        }

        const result = await prismaClient.user.update({
            where: {
                id: user.id
            },
            data: updateData
        })

        return toUserResponse(result)
    }

    static async login(request: LoginUserRequest): Promise<UserResponse> {
        const loginRequest = Validation.Validate(UserValidation.LOGIN, request)
        let user = await prismaClient.user.findUnique({
            where: {
                email: loginRequest.email
            }
        })

        if(!user) {
            throw new ResponseError(400, "Email or Password invalid")
        }

        const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password)
        if(!isPasswordValid) {
            throw new ResponseError(400, "Email or Password invalid")
        }

        const token = jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email
        }, process.env.JWT_SECRET_KEY! , { expiresIn: "1d" })

        user = await prismaClient.user.update({
            where: {
                email: loginRequest.email
            },
            data: {
                token: token
            }
        })

        const response = toUserResponse(user)
        response.token = token
        return response
    }

    static async logout(user: User): Promise<UserResponse> {
        const result =await prismaClient.user.update({
            where: {
                id: user.id
            },
            data: {
                token: null
            }
        })

        return toUserResponse(result)
    }
}