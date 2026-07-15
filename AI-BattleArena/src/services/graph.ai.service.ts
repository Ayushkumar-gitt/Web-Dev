import { HumanMessage } from "@langchain/core/messages";
import { StateSchema, MessagesValue, type GraphNode, ReducedValue, StateGraph, START, END } from "@langchain/langgraph";
import { z } from 'zod';
import { cohereModel, mistralModel } from "./models.service.js";

// type JUDGEMENT = {
//     winner: "Solution 1" | "Solution 2",
//     solution1score: number,
//     solution2score: number
// }

// type AIBATTLESTATE = {
//     messages: typeof MessagesValue,
//     solution_1: String,
//     solution_2: String,
//     judgement: JUDGEMENT
// }

// const state: AIBATTLESTATE = {
//     messages: MessagesValue,
//     solution_1: "",
//     solution_2: "",
//     judgement: {
//         winner: "Solution 1",
//         solution1score: 0,
//         solution2score: 0
//     }
// }
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
    judge_recomendation: new ReducedValue(z.object().default({
        solution_1_score: 0,
        solution_2_score: 0,
        winner: "solution 1" | "solution 2"
    }), {
        reducer: (current, next) => {
            return next
        },
    })
})
const solutionNode: GraphNode<typeof State> = async (state: typeof State) => {
    // console.log(state);

    const [mistral_solution, cohere_solution] = await Promise.all([
        mistralModel.invoke(state.messages[0].text),
        cohereModel.invoke(state.messages[0].text)
    ])
    return {
        solution_1: mistral_solution.content,
        solution_2: cohere_solution.content
    }

}

const graph = new StateGraph(State)
    .addNode("Solution", solutionNode)
    .addEdge(START, "Solution").addEdge('Solution', END)
    .compile();

async function sendMessage(userMessage: string) {
    const result = await graph.invoke({
        messages: [
            new HumanMessage(userMessage)
        ]
    })
    console.log(result);

    return result.messages
}
export default sendMessage