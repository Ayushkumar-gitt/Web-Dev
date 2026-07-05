import { generateChatTitle, generateResponse } from "../services/ai.service.js"
import chatModel from "../models/chat.model.js"
export async function sendMessage(request, response) {
    const { message } = request.body

    const title = await generateChatTitle(message)
    const AiResponse = await generateResponse(message)

    const chat = await chatModel.create({
        
    })
    response.status(200).json({
        title:title,
        Aimessage: AiResponse
    })
}
