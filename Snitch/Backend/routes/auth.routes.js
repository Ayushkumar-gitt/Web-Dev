import express from "express";
import { googleCallback, loginController, registerController } from "../controllers/auth.controller.js"
import { loginValidate, validateRegisterUser } from "../validator/auth.validator.js";
import passport from "passport";

const authRouter = express.Router();

authRouter.post('/register', validateRegisterUser, registerController)
authRouter.post('/login', loginValidate, loginController)

authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }))

authRouter.get("/google/callback", passport.authenticate("google",
    { failureRedirect: "http://localhost:5173/register", session: false }), googleCallback
)

export default authRouter;