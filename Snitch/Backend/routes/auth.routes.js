import express from "express";
import { getMeController, googleCallback, loginController, registerController } from "../controllers/auth.controller.js"
import { loginValidate, validateRegisterUser } from "../validator/auth.validator.js";
import passport from "passport";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post('/register', validateRegisterUser, registerController)
authRouter.post('/login', loginValidate, loginController)

authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }))

authRouter.get("/google/callback", passport.authenticate("google",
    { failureRedirect: "http://localhost:5173/register", session: false }), googleCallback
)

authRouter.get("/getme",authenticateUser,getMeController)

export default authRouter;