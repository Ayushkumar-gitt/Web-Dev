import { useDispatch } from "react-redux";
import { addNewMessage, createNewChat, setChats, setCurrentChatId, setisLoading } from "../chat.slice";
import { deleteChat, getChats, getMessages, sendMessage } from "../service/chat.api";
import { initSocketConnection } from "../service/chat.socket";

export function useChat() {
    const dispatch = useDispatch()
    async function handleSendMessages({ message, chatId }) {
        dispatch(setisLoading(true))
        const response = await sendMessage({ message, chatId })

        const { chat, aiMessage } = response

        dispatch(createNewChat({ chatId: chat._id, title: chat.title }))
        dispatch(addNewMessage({ chatId: chat._id, content: message, role: 'user' }))
        dispatch(addNewMessage({ chatId: chat._id, content: aiMessage, role: 'ai' }))
        dispatch(setCurrentChatId(chat._id))
        dispatch(setisLoading(false))
    }
    return {
        initSocketConnection,
        handleSendMessages
    }
}

// setChats, setisLoading, setCurrentChatId, setError