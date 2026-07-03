import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import 'dotenv/config'
const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    apiKey: process.env.GEMINI_API_KEY
});

export async function generateResponse() {
    const response = await model.invoke("Which specific gemini model i am taking to?");
    console.log(response.text);
}

