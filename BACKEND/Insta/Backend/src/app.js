const express = require("express")
const app = express()
const cors = require("cors")
const cookie = require("cookie-parser")
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
const authRouter = require("../Routes/auth.routes")
const postRouter = require("../Routes/post.routes")
const userRouter = require("../Routes/user.routes")

app.use(express.json())
app.use(cookie())
app.use("/auth/", authRouter)
app.use("/posts", postRouter)
app.use("/users", userRouter)

module.exports = app