import { HumanMessage } from "@langchain/core/messages";
import { StateSchema, MessagesValue, type GraphNode, ReducedValue, StateGraph, START, END } from "@langchain/langgraph";
import { z } from 'zod';
import { cohereModel, geminiModel, mistralModel } from "./models.service.js";
import { createAgent, providerStrategy } from "langchain";

type JudgeRecommendation = {
    solution_1_score: number;
    solution_2_score: number;
    winner: "solution 1" | "solution 2";
}

const State = new StateSchema({
    messages: MessagesValue,
    solution_1: new ReducedValue(z.string().default(""), {
        reducer: (current, next) => {
            return next;
        },
    }),
    solution_2: new ReducedValue(z.string().default(""), {
        reducer: (current, next) => {
            return next;
        },
    }),
    judge_recomendation: new ReducedValue(z.object({
        solution_1_score: z.number(),
        solution_2_score: z.number(),
        winner: z.enum(["solution 1", "solution 2"])
    }).default({
        solution_1_score: 0,
        solution_2_score: 0,
        winner: "solution 1"
    }), {
        reducer: (current, next) => {
            return next
        },
    })
})
const solutionNode: GraphNode<typeof State> = async (state: any) => {
    // console.log(state);

    const [mistral_solution, cohere_solution] = await Promise.all([
        mistralModel.invoke(state.messages[0].text),
        cohereModel.invoke(state.messages[0].text)
    ])
    return {
        solution_1: String(mistral_solution.content),
        solution_2: String(cohere_solution.content)
    }

}

const judgeNode: GraphNode<typeof State> = async (state: any) => {
    console.log("invoking judge", state);

    const { solution_1, solution_2 } = state;

    const judge = createAgent({
        model: geminiModel,
        tools: [],
        responseFormat: providerStrategy(z.object({
            solution_1_score: z.number().min(0).max(10),
            solution_2_score: z.number().min(0).max(10)
        }))
    })

    const judge_response = await judge.invoke({
        messages: [
            new HumanMessage(`You are a judge for a competition between two solutions. Solution 1: ${solution_1} Solution 2: ${solution_2} Please provide a score for each solution between 0 and 10, and indicate which solution is the winner.`)
        ]
    })
    const result = judge_response.structuredResponse
    console.log("result - ", result);

    const recommendation: JudgeRecommendation = {
        ...result,
        winner: result.solution_1_score >= result.solution_2_score ? "solution 1" : "solution 2"
    }

    return {
        judge_recomendation: recommendation
    }
}

const graph = new StateGraph(State)
    .addNode("Solution", solutionNode)
    .addNode("Judge", judgeNode)
    .addEdge(START, "Solution")
    .addEdge("Solution", "Judge")
    .addEdge("Judge", END)
    .compile();

async function sendMessage(userMessage: string) {
    const result = await graph.invoke({
        messages: [
            new HumanMessage(userMessage)
        ]
    })
    console.log(result);

    return result
}
export default sendMessage