const express = require("express")

const authRouter = express.Router()

const authController = require("../controllers/auth.controller")
const identifyUser = require("../middlewares/IdentifyUser")

authRouter.post("/register", authController.registerControl)

authRouter.post("/login", authController.loginController)

authRouter.get('/getme',identifyUser,authController.getMeController)
module.exports = authRouter