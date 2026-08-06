import mongoose from "mongoose";
import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import { config } from "../config/config.js";

async function sendTokenResponse(user, response) {
    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: '7d' })

    response.cookie("token", token)

    response.status(200).json({
        token,
        user: {
            id: user._id,
            email: user.email,
            contact: user.contact,
            fullname: user.fullname,
            role: user.role
        }
    })

}

async function registerController(request, response) {
    const { email, password, contact, fullname, isSeller } = request.body;

    const emailExists = await userModel.findOne({
        $or: [
            { email },
            { contact }
        ]
    })

    if (emailExists) {
        return response.status(400).json({
            message: "User already exists with this email",
            success: false
        })
    }
    const user = await userModel.create({
        email, contact, password, fullname, role: isSeller ? "seller" : "buyer"
    })

    await sendTokenResponse(user, response)

}

async function loginController(request, response) {
    const { email, password } = request.body;

    const user = await userModel.findOne({ email })

    if (!user) {
        return response.status(400).json({
            message: "Invalid email or password",
            success: false
        })
    }

    const isPasswordValid = await user.comparePassword(password)

    if (!isPasswordValid) {
        return response.status(400).json({
            message: "Invalid email or password",
            success: false
        })
    }

    await sendTokenResponse(user, response)
}

async function googleCallback(request, response) {
    const { id, displayName, emails, photos } = request.user
    const email = emails[0].value
    const profilePicture = photos[0].value
    const user = userModel.findOne({ email })
    if (!user) {
        userModel.create({
            email: email,
            fullname: displayName,
            googleId: id,

        })
    }
    const token = jwt.sign({
        id: user.id
    }, config.JWT_SECRET, { expiresIn: '7d' })

    response.cookie("token", token)

    // console.log(request.user);
    response.redirect("http://localhost:5173/")
}
export { registerController, loginController, googleCallback };