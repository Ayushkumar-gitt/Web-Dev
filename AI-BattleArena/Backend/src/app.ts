import express from 'express'
import sendMessage from './services/graph.ai.service.js'
import { success } from 'zod'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST"],
    credentials:true
    
}))
app.get('/health', (request, response) => {
    response.status(200).json({
        status: "ok"
    })
})

app.post("/usegraph", async (request, response) => {
    const {input} = request.body
    const result = await sendMessage(input);

    response.status(200).json({
        message : "Graph executed successfully",
        success:true,
        data : result
    })
})


export default app