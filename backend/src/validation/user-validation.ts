import { ZodType, z } from "zod"

export class UserValidation {
    static readonly REGISTER: ZodType = z.object({
        username: z.string().min(1).max(100),
        email: z.string().email().min(1).max(100),
        password: z.string().min(4).max(20)
    })

    static readonly UPDATE: ZodType = z.object({
        username: z.string().min(1).max(100),
        password: z.string().min(4).max(20)
    })

    static readonly LOGIN: ZodType = z.object({
        email: z.string().email().min(1).max(100),
        password: z.string().min(4).max(20)
    })
}