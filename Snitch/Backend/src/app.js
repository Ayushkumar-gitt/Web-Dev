import cookieParser from 'cookie-parser';
import express from 'express';
import authRouter from '../routes/auth.routes.js';
import cors from 'cors'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { config } from '../config/config.js';

const app = express()

app.use(express.json())
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true
// }))
app.use(cookieParser())


app.use(passport.initialize())

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}))


app.use("/auth", authRouter)
export default app;