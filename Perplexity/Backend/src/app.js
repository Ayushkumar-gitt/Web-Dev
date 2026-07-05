import 'dotenv/config';
import express from 'express'
import authRouter from '../routes/auth.routes.js';
import cookieParser from "cookie-parser"
import cors from 'cors'
import morgan from 'morgan'
import chatRouter from '../routes/chat.routes.js';
const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use('/auth', authRouter)
app.use("/chats",chatRouter)
app.use(morgan('dev'))

export default app
