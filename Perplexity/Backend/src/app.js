import 'dotenv/config';
import express from 'express'
import authRouter from '../routes/auth.routes.js';
import cookieParser from "cookie-parser"
import cors from 'cors'
import morgan from 'morgan'
import chatRouter from '../routes/chat.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))
app.use('/auth', authRouter)
app.use("/chats",chatRouter)
app.use(morgan('dev'))

export default app
