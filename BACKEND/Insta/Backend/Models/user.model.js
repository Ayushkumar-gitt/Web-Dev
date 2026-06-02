const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "User already exists with this username"],
        required: true
    },
    email: {
        type: String,
        unique: [true, "Entered email already exists"],
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    bio: String,
    profile_pic: {
        type: String,
        default: "https://img.magnific.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg?semt=ais_hybrid&w=740&q=80"
    }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel