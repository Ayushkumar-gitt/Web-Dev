import { useDispatch } from "react-redux";
import { setChats, setCurrentChatId, setisLoading } from "../chat.slice";
import { deleteChat, getChats, getMessages, sendMessage } from "../service/chat.api";
import { initSocketConnection } from "../service/chat.socket";

export function useChat() {
    const dispatch = useDispatch()
    async function handleSendMessages({ message, chatId }) {
        dispatch(setisLoading(true))
        // console.log(message);
        const response = await sendMessage({ message, chatId })
        
        const { chat, aiMessage } = response

        dispatch(setChats((chatsTillNow) => {
            return {
                ...chatsTillNow,
                [chat._id]: {
                    ...chat,
                    messages: [{ content: message, role: "user" }, aiMessage]
                }
            }
        }))
        dispatch(setCurrentChatId(chat._id))
        dispatch(setisLoading(false))
    }
    return {
        initSocketConnection,
        handleSendMessages
    }
}

// setChats, setisLoading, setCurrentChatId, setError