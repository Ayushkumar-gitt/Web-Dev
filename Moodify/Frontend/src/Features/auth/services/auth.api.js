import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3000/auth",
    withCredentials:true
})

export async function register({email,password,username}) {
    const response = await api.post("/register",{email,password,username})

    return response.data
}

export async function login({email,password,username}) {
    const response = await api.post("/login",{email,password,username})

    return response.data
}

export async function getme(){
    const response = await api.get("/getme")

    return response.data
}

export async function logout(){
    const response = await api.get("/logout")

    return response.data
}