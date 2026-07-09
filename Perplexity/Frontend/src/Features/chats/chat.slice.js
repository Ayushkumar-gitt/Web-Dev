import { createSlice } from '@reduxjs/toolkit'

const chatslice = createSlice({
    name: "chat",
    initialState: {
        chats: {},
        isLoading: false,
        currentChatId: null,
        error: null
    },
    reducers: {
        createNewChat: (state, action) => {
            const { chatId, title } = action.payload
            state.chats[chatId] = {
                _id: chatId,
                id: chatId,
                title: title,
                messages: [],
                lastUpdated: new Date().toISOString()
            }
        },
        addMessages:(state,action)=>{
            const {chatId,messages}=action.payload
            state.chats[chatId].messages.push(...messages)
        },
        addNewMessage: (state, action) => {
            const { chatId, content, role } = action.payload
            const normalizedContent = typeof content === 'string'
                ? content
                : content?.content ?? content?.message ?? content?.text ?? ''
            
            state.chats[chatId].messages.push({
                content: normalizedContent,
                role: role
            })
        },
        setChats: (state, action) => {
            state.chats = action.payload
        },
        setisLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setCurrentChatId: (state, action) => {
            state.currentChatId = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        }
    }
})

export const { setChats, setisLoading, setCurrentChatId, setError, createNewChat, addNewMessage,addMessages } = chatslice.actions

export default chatslice.reducer

