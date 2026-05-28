const express = require("express")
const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")

const authRouter = express.Router()

authRouter.post("/register", async (request, response) => {
    const { name, email, password } = request.body
    const userExists = await userModel.findOne({ email })

    if (userExists) {
        return response.status(400).json({
            message: "user already exists"
        })
    }

    const user = await userModel.create({ name, email, password })
    
    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    response.cookie("token",token)

    response.status(201).json({
        message: "user registered",
        user,
        token
    })
})

module.exports = authRouter