const songModel = require("../models/songs.model")
const id3 = require('node-id3')
const uploadFile = require("../services/storage.service")

async function songUploadController(request, response) {
    const songBuffer = request.file.buffer
    const { mood } = request.body
    const songTags = id3.read(songBuffer)

    const [songFile, posterFile] = await Promise.all([
        uploadFile({
            buffer: songBuffer,
            filename: songTags.title + ".mp3",
            folder: "/moodify/songs"
        }),

        uploadFile({
            buffer: songTags.image.imageBuffer,
            filename: songTags.title + ".jpeg",
            folder: "/moodify/posters"
        })
    ])

    const song = await songModel.create({
        title: songTags.title,
        songUrl: songFile.url,
        coverUrl: posterFile.url,
        mood: mood
    })

    response.status(201).json({
        message: "song created successfully",
        song
    })
}
async function getSong(request,response){
    const {mood} = request.query

    const song = await songModel.findOne({
        mood
    })

    response.status(200).json({
        message:"song fetched successfully",
        song
    })
    
}
module.exports = {
    songUploadController,
    getSong
}