const express = require("express")
const noteModel = require("./models/notes_model")

const app = express() // server create hua express ko call krne se 
const notes = [];

app.use(express.json())

app.post('/notes', async(request, response) => {
    const {title,description} = request.body
    const note = await noteModel.create({title,description})
    response.status(201).json({
        message: "Note created",
        note
    })
})

app.get('/notes', (request, response) => {
    response.send(notes)
})

app.delete('/notes/:idx', (request, response) => {
    const idx = request.params.idx
    console.log(idx);
    delete notes[idx]
    response.send('note deleted')
})

app.patch('/notes/:idx', (request, response) => {
    const idx = requestuest.params.idx;
    notes[idx].description = requestuest.body.description
    response.send("note updated")
})


module.exports = app;