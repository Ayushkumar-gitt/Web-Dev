const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const blacklistModel = require("../models/blacklist.model")
const redis = require("../config/cache")

async function registerUserController(request, response) {
    const { username, email, password } = request.body

    const userAlreadyExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (userAlreadyExists) {
        return response.status(400).json({
            message: "User with same email or username already exists"
        })
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username: username,
        email: email,
        password: hash
    })

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, { expiresIn: '3d' })

    response.cookie("registertoken", token)

    response.status(201).json({
        message: "User created Successfully",
        user: {
            username: user.username,
            email: user.email
        }
    })
}

async function loginUserController(request, response) {
    const { username, email, password } = request.body

    const user = await userModel.findOne({
        $or: [
            { email },
            { password }
        ]
    }).select("+password")

    if (!user) {
        return response.status(400).json({
            messasge: "Invalid Credentials"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return response.status(400).json({
            message: "Invalid Credentials"
        })
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, { expiresIn: '3d' })

    response.cookie("loginToken", token)

    response.status(200).json({
        message: "User login Successfully",
        user: {
            username: user.username,
            email: user.email
        }
    })
}

async function getMeController(request, response) {
    const user = await userModel.findById(request.user.id)

    response.status(200).json({
        message: "user fetched successfully",
        user
    })

}
async function logoutUserController(request, response) {
    const token = request.cookies.loginToken

    response.clearCookie("loginToken")
    
    await redis.set(token, token)

    response.status(200).json({
        message: "Logout done"
    })
}
module.exports = {
    registerUserController,
    loginUserController,
    getMeController,
    logoutUserController
}