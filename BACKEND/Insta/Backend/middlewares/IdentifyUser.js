const jwt = require("jsonwebtoken")

function identifyUser(request, response, next) {
    const token = request.cookies.loginToken
    if (!token) {
        return response.status(401).json({
            message: "Unauthorized access"
        })
    }
    let decoded = null
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return response.status(401).json({
            message: "Unauthorized access"
        })
    }
    request.user = decoded
    next()
}

module.exports = identifyUser