import express from 'express'
import sendMessage from './services/graph.ai.service.js'

const app = express()

app.get('/health', (request, response) => {
    response.status(200).json({
        status: "ok"
    })
})

app.post("/usegraph",async(request,response)=>{
    await sendMessage("What is the capital of france?") 
})

export default app