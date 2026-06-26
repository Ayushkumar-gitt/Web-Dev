const express = require("express")
const { registerUserController, loginUserController,getMeController, logoutUserController } = require("../controllers/auth.controller")
const authUser = require("../middlewares/auth.middleware")

const AuthRouter = express.Router()

AuthRouter.post("/register", registerUserController)
AuthRouter.post("/login", loginUserController)
AuthRouter.get("/getme", authUser,getMeController)
AuthRouter.get("/logout",logoutUserController)

module.exports = AuthRouter;