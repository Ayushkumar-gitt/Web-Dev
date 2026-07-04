import 'dotenv/config';
import express from 'express'
import authRouter from '../routes/auth.routes.js';
import cookieParser from "cookie-parser"
import cors from 'cors'
import morgan from 'morgan'
const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use('/auth', authRouter)
app.use(morgan('dev'))

export default app
