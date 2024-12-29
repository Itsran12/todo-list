import expree from "express"
import cors from "cors"
import dotenv from "dotenv"

import { errorMiddleware } from "../middleware/error-middleware"
import { publicApi } from "../routes/public-api"
import { api } from "../routes/api"

dotenv.config()
export const app = expree()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(expree.json())

app.use(publicApi)
app.use(api)

app.use(errorMiddleware)