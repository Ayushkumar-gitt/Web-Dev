const express = require("express")
const cookieParser = require('cookie-parser')
const AuthRouter = require("../Routes/auth.routes")
const cors = require('cors')
const SongRouter = require("../Routes/song.routes")
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/auth/", AuthRouter)
app.use("/songs/",SongRouter)

module.exports = app
