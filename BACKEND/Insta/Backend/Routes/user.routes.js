const express = require("express")
const identifyUser = require("../middlewares/IdentifyUser")
const { followUserController, unfollowUserController } = require("../controllers/user.controller")
const { likePostController } = require("../controllers/post.controller")

const userRouter = express.Router()

userRouter.post('/follow/:username',identifyUser,followUserController)
userRouter.post('/unfollow/:username',identifyUser,unfollowUserController)
userRouter.post("/like/:likeId",identifyUser,likePostController)
module.exports = userRouter