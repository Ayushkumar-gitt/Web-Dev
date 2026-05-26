const express = require("express")
const noteModel = require("./models/notes_model")
const cors = require('cors')
const path = require("path")
const app = express() // server create hua express ko call krne se 
const notes = [];

app.use(cors())
app.use(express.json())
app.use(express.static("./public"))

app.post('/notes', async(request, response) => {
    const {title,description} = request.body
    const note = await noteModel.create({title,description})
    response.status(201).json({
        message: "Note created",
        note
    })
})

app.get('/notes', async (request, response) => {
    const note = await noteModel.find()

    response.status(200).json({
        note
    })
})

app.delete('/notes/:idx', async(request, response) => {
    const idx = request.params.idx
    // console.log(idx);
    await noteModel.findByIdAndDelete(idx)
    response.status(200).json({
        message : "Note deleted Successfully"
    })
})

app.patch('/notes/:idx', async(request, response) => {
    const idx = request.params.idx;
    const {title,description} = request.body
    const note = await noteModel.findByIdAndUpdate(idx,{title,description})

    response.status(200).json({
        message : "Updation succesful",
        note
    })
})

console.log(__dirname);

app.use('*name',(request,response)=>{
    response.sendFile(path.join(__dirname,"/public/index.html"))
})

module.exports = app;
