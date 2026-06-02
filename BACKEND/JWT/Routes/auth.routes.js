const express = require("express")
const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")
const crypto = require("crypto")

const authRouter = express.Router()

authRouter.post("/register", async (request, response) => {
    const { name, email, password } = request.body
    const userExists = await userModel.findOne({ email })

    if (userExists) {
        return response.status(400).json({
            message: "user already exists"
        })
    }
    const hash = crypto.createHash("md5").update(password).digest("hex")

    const user = await userModel.create({ name, email, password: hash })

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, { expiresIn: "1h" })

    response.cookie("token", token)

    response.status(201).json({
        message: "user registered",
        user,
        token
    })
})

authRouter.post('/login', (async (request, response) => {
    const { email, password } = request.body
    const user = await userModel.findOne({ email })

    if (!user) {
        return response.status(404).json({
            message: "user not found with this email"
        })
    }

    const isPassCorrect = user.password === crypto.createHash("md5").update(password).digest("hex")

    if (!isPassCorrect) {
        return response.status(404).json({
            message: "Password is incorrect"
        })
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    response.cookie("loginToken", token)

    response.status(200).json({
        message: "Login done",
        user
    })
}
))

authRouter.get("/getUser", async (request, response) => {
    const token = request.cookies.token

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await userModel.findById(decoded.id)

    response.json({
        name: user.name,
        email: user.email,
        password: user.password
    })
})

module.exports = authRouter