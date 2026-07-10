import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage, AIMessage, tool, createAgent } from 'langchain'
import { ChatMistralAI } from '@langchain/mistralai'
import 'dotenv/config'
import { internetSearch } from "./internet.service.js";
import * as z from 'zod'

const geminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    apiKey: process.env.GEMINI_API_KEY
});

const mistralModel = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY
})

const searchInternetTool = tool(
    internetSearch,
    {
        name: "searchInternet",
        description: "Use this tool to get latest information form the internet. Useful for when you need to answer questions about current events or find information that is not in your training data.",
        schema: z.string().describe("The search query to look up on the internet")
    }
)

const agent = createAgent({
    model: mistralModel,
    tools: [searchInternetTool]
})

export async function generateResponse(messages) {
    const response = await agent.invoke({
        messages: messages.map((msg) => {
            if (msg.role == "user") {
                return new HumanMessage(msg.content)
            } else if (msg.role == "ai") {
                return new AIMessage(msg.content)
            }
        })
    })

    return response.messages[response.messages.length - 1].text
}

export async function generateChatTitle(message) {

    const response = await mistralModel.invoke([
        new SystemMessage("You are a helpful assistant that generates consise and descriptive titles for chat conversation based on a single user message. The title should be no more than 4 words and should not include any special characters or punctuation."),
        new HumanMessage(message)
    ]);

    return response.text
}
