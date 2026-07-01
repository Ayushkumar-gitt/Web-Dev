const express = require("express")
const { songUploadController, getSong } = require("../controllers/song.controller")
const upload = require("../middlewares/upload.middleware")

const SongRouter = express.Router()

SongRouter.post("/",upload.single("song"),songUploadController)
SongRouter.get("/getsong",getSong)
module.exports = SongRouter