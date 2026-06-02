const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    user: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "user Id is required for creating a post"]
    },
    imgUrl: {
        type : String,
        required: [true, "Image Url is required for creating a post"]
    },
    caption: {
        type: String,
        default: ""
    }
})

const postModel = mongoose.model("posts", postSchema)

module.exports = postModel