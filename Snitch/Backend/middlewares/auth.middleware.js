import { config } from "../config/config.js"
import userModel from "../models/user.model.js"
import jwt from 'jsonwebtoken'
export async function authenticateSeller(request, response, next) {
    const token = request.cookies.token
    if (!token) {
        return response.status(401).json({
            message: "Unauthorized",
            success: false
        })
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET)
        const user = await userModel.findById(decoded.id)

        if (!user) {
            return response.status(401).json({
                message: "Unauthorized",
                success: false
            })
        }

        if (user.role !== "seller") {
            return response.status(403).json({
                message: "Forbidden: You do not have permission to access this resource",
                success: false
            })
        }

        request.user = user
        next()
    }
    catch (err) {
        return response.status(401).json({
            message: "Unauthorized",
            success: false
        })
    }
}