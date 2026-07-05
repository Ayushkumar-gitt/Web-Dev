import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from 'langchain'
import { ChatMistralAI } from '@langchain/mistralai'
import 'dotenv/config'
const geminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    apiKey: process.env.GEMINI_API_KEY
});

const mistralModel = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY
})

export async function generateResponse(message) {
    const response = await mistralModel.invoke([
        new HumanMessage(message)
    ]);

    return response.text
}

export async function generateChatTitle(message) {

    const response = await mistralModel.invoke([
        new SystemMessage("You are a helpful assistant that generates consise and descriptive titles for chat conversation based on a single user message. The title should be no more than 4 words and should not include any special characters or punctuation."),
        new HumanMessage(message)
    ]);

    return response.text
}
