const express = require("express")
const cookieParser = require('cookie-parser')
const AuthRouter = require("../Routes/auth.routes")

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/auth/",AuthRouter)

module.exports = app
