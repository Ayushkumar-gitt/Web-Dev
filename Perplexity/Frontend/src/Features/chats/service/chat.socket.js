import { io } from 'socket.io-client'

export function initSocketConnection() {
    const socket = io("http://localhost:3000", {
        withCredentials: true
    })

    socket.on("connect",()=>{
        console.log("User connected to IO server");
    })
}

