import express from 'express'
import { config } from 'dotenv'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

config()

const app = express()

app.use(passport.initialize())

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, (_, __, profile, done) => {
    return done(null, profile);
}))

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }))

app.get("/auth/google/callback", passport.authenticate("google",
    { failureRedirect: "/", session: false }),

    (request, response) => {
        console.log(request.user);
        response.send("Google auth successfull")
    })

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})