const userModel = require("../Models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function registerControl(request, response) {
    const { username, email, password, bio, profile_pic } = request.body

    const isUserExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (isUserExists) {
        return response.status(409).json({
            message: "user with this " + (isUserExists.email == email ? "Email already exists" : "username already exists")
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({ username, email, password: hash, bio, profile_pic })

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, { expiresIn: "1d" }
    )

    response.cookie("registerToken", token)

    response.status(200).json({
        message: "User Registered Successfully",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profile_pic: user.profile_pic
        }
    })
}


async function loginController(request, response) {
    const { email, password, username } = request.body

    const user = await userModel.findOne({
        $or: [
            {
                username: username
            },
            {
                email: email
            }
        ]
    }).select("+password")

    if (!user) {
        return response.status(404).json({
            message: "User doesn't exists"
        })
    }

    const isPasswordCorrect = bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
        return response.status(404).json({
            message: "Password is Incorrect"
        })
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, { expiresIn: '1d' })

    response.cookie("loginToken", token)

    response.status(200).json({
        message: "Logged in successfully",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profile_pic: user.profile_pic
        }
    })
}
async function getMeController(request,response) {
    const userId = request.user.id;
    const user = await userModel.findById(userId)

    response.status(200).json({
        user:{
            email: user.email,
            username: user.username,
            bio: user.bio,
            profile_pic: user.profile_pic
        }
    })
}
module.exports = {
    registerControl,
    loginController,
    getMeController
}