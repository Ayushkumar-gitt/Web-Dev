import { tavily } from "@tavily/core"

const tvly = tavily({ apiKey: process.env.TAVELY_API_KEY });

export async function internetSearch(question) {
    const answer = await tvly.search(question);
    // console.log("Tavely reply", answer.results);

    return JSON.stringify(answer)
}
