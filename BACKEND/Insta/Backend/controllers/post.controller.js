// import ImageKit, { toFile } from '@imagekit/nodejs';
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const postModel = require("../Models/post.model");
const likeModel = require("../Models/like.model");

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_SECRET
})

async function createPostController(request, response) {
    // console.log(request.body, request.file);
    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(request.file.buffer), 'file'),
        fileName: "Test",
        folder: "Insta"
    })

    const post = await postModel.create({
        caption: request.body.caption,
        imgUrl: file.url,
        user: request.user.id
    })

    response.status(201).json({
        message: "Post created successfully",
        post
    })

}


async function getPostController(request, response) {

    const userId = request.user.id

    const posts = await postModel.find({
        user: userId
    })

    response.status(200).json({
        posts
    })
}

async function getPostDetailsController(request, response) {
    const userId = request.user.id

    const postId = request.params.postId
    console.log(postId);


    const post = await postModel.findById(postId)

    if (!post) {
        return response.status(404).json({
            message: "Post not found"
        })
    }

    const isValidUser = post.user.toString() === userId
    console.log("isvalid - " + isValidUser);

    if (!isValidUser) {
        return response.status(403).json({
            message: "Forbidden content"
        })
    }

    response.status(200).json({
        message: "Post fetched",
        post
    })
}
async function likePostController(request, response) { // We have to like a post
    const username = request.user.username
    const postId = request.params.postId

    const post = await postModel.findById(postId) // First finding the post the we have to like
    console.log(post);

    if (!post) { // If post itself is not there , we will obviously return
        return response.status(404).json({
            message: "Post doesn't exists"
        })
    }

    try {
        const like = await likeModel.create({
            post: postId, // kis post pr like kr rhe h 
            user: username // kon like kr rha h
        })
    } catch (error) {
        return response.status(404).json({
            message: "Already liked the post"
        })
    }

    response.status(200).json({
        message: "Post Liked successfully",
        post
    })
}

async function feedPostController(request, response) {
    const posts = await postModel.find().populate("user")

    response.status(200).json({
        message : "Posts for feed fetched successfully",
        posts
    })
}
module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController,
    feedPostController
}