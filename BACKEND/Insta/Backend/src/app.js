const express = require("express")
const app = express()
const cookie = require("cookie-parser")
const authRouter = require("../Routes/auth.routes")
const postRouter = require("../Routes/post.routes")
const userRouter = require("../Routes/user.routes")

app.use(express.json())
app.use(cookie())
app.use("/auth/", authRouter)
app.use("/posts", postRouter)
app.use("/users",userRouter)

module.exports = app