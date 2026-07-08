import axios from "axios"

const api = axios.create({
    baseURL:"http://localhost:3000/chats",
    withCredentials:true
})

export async function sendMessage({message,chatId}){
    console.log(message);
    
    const response = await api.post("/message", { message, chat: chatId })
    return response.data
}

export async function getChats(){
    const response = await api.get("/")
    return response.data
}

export async function getMessages(chatId){
    const response = await api.get(`/${chatId}/messages`)
    return response.data
}

export async function deleteChat(id){
    const response = await api.delete(`/${id}/delete`)
    return response.data
}

