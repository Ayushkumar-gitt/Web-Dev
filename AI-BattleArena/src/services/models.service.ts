import { ChatGoogle } from "@langchain/google";
import configg from "../config/config.js";
import { ChatMistralAI } from "@langchain/mistralai"
import { ChatCohere } from "@langchain/cohere"

export const mistralModel = new ChatMistralAI({
    model: "mistral-medium-latest",
    apiKey: configg.MISTRAL_API_KEY
})

export const geminiModel = new ChatGoogle({
    apiKey: configg.GEMINI_API_KEY,
    model: "gemini-flash-latest",
});

export const cohereModel = new ChatCohere({
    model: "command-a-03-2025",
    apiKey:configg.COHERE_API_KEY
})