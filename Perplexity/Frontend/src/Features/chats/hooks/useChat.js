import { useDispatch } from "react-redux";
import { addMessages, addNewMessage, createNewChat, setChats, setCurrentChatId, setisLoading } from "../chat.slice";
import { deleteChat, getChats, getMessages, sendMessage } from "../service/chat.api";
import { initSocketConnection } from "../service/chat.socket";

export function useChat() {
    const dispatch = useDispatch()
    async function handleSendMessages({ message, chatId }) {
        dispatch(setisLoading(true))
        const response = await sendMessage({ message, chatId })

        const { chat, aiMessage } = response

        if (!chatId) {
            dispatch(createNewChat({ chatId: chat._id, title: chat.title }))
        }
        dispatch(addNewMessage({ chatId: chatId || chat._id, content: message, role: 'user' }))
        dispatch(addNewMessage({ chatId: chatId || chat._id, content: aiMessage, role: 'ai' }))
        dispatch(setCurrentChatId(chat._id))
        dispatch(setisLoading(false))
    }
    async function handleGetChats() {
        dispatch(setisLoading(true))
        const response = await getChats()
        const { chats } = response
        dispatch(setChats(chats.reduce((acc, chat) => {
            acc[chat._id] = {
                id: chat._id,
                title: chat.title,
                messages: [],
                lastUpdated: chat.updatedAt
            }
            return acc

        }, {})))
        dispatch(setisLoading(false))
        // dispatch(setCurrentChatId(chats[0]._id))
    }

    async function handleOpenChat(chatId, chats) {
        if (chats[chatId]?.messages.length === 0) {
            const { messages } = await getMessages(chatId)
            const formattedMessages = messages.map(msg => ({
                content: msg.content,
                role: msg.role
            }))
            dispatch(addMessages({ chatId, messages: formattedMessages }))
            dispatch(setCurrentChatId(chatId))
        }
    }
    return {
        initSocketConnection,
        handleSendMessages,
        handleGetChats,
        handleOpenChat
    }
}

// setChats, setisLoading, setCurrentChatId, setError