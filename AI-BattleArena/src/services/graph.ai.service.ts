import { StateSchema, MessagesValue, type GraphNode, StateGraph, START, END } from "@langchain/langgraph";

type JUDGEMENT = {
    winner: "Solution 1" | "Solution 2",
    solution1score: number,
    solution2score: number
}

type AIBATTLESTATE = {
    messages: typeof MessagesValue,
    solution_1: String,
    solution_2: String,
    judgement: JUDGEMENT
}

const state: AIBATTLESTATE = {
    messages: MessagesValue,
    solution_1: "",
    solution_2: "",
    judgement: {
        winner: "Solution 1",
        solution1score: 0,
        solution2score: 0
    }
}