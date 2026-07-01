const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    songUrl: {
        type: String,
        required: true
    },
    coverUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    mood:{
        type:String,
        required:true,
        enum:{
            values:["sad","happy","surprised"]
        }
    }
})

const songModel = mongoose.model("songs",songSchema)

module.exports = songModel