const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')
const blacklistModel = require('../models/blacklist.model')
const redis = require('../config/cache')

async function authUser(request, response, next) {
    const token = request.cookies.loginToken

    if (!token) {
        return response.status(401).json({
            message: "User not authorized"
        })
    }

    const isTokenBlacklisted = await redis.get(token)

    if (isTokenBlacklisted) {
        return response.status(401).json({
            message: "Token is blacklisted"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        request.user = decoded
        next()
    } catch (error) {
        return response.status(400).json({
            message: "Invalid token"
        })
    }
}

module.exports = authUser