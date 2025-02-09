import { UserService } from "../services/user"
import { CreateUserRequest, UpdateUserRequest, LoginUserRequest } from "../models/user-model"
import { UserRequest } from "../type/types"
import { Request, Response, NextFunction } from "express"

export class UserController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request = req.body as CreateUserRequest
            const response = await UserService.register(request)
            res.status(201).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await UserService.get(req.user!)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request = req.body as UpdateUserRequest
            const response = await UserService.update(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request = req.body as LoginUserRequest
            const response = await UserService.login(request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async logout(req: UserRequest, res: Response, next: NextFunction) {
        try {
            await UserService.logout(req.user!)
            res.status(200).json({
                data: "OK"
            })
        } catch (error) {
            next(error)
        }
    }
}