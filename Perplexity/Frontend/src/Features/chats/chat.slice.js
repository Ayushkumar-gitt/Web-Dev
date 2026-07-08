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

export const { setChats, setisLoading, setCurrentChatId, setError } = chatslice.actions

export default chatslice.reducer

