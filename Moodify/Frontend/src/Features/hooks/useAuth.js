import { useContext } from "react";
import { AuthContext } from "../auth/auth.context";
import { register, login, getme, logout } from "../auth/services/auth.api";
import { useEffect } from "react";

export function useAuth() {
    const context = useContext(AuthContext)
    const { user, loading, setuser, setloading } = context

    async function handleRegister({ email, password, username }) {
        setloading(true)
        try {
            const data = await register({ email, password, username })
            setuser(data.user)
        } finally {
            setloading(false)
        }
    }

    async function handleLogin({ email, password, username }) {
        setloading(true)
        try {
            const data = await login({ email, password, username })
            setuser(data.user)
        } finally {
            setloading(false)
        }
    }

    async function handleGetme() {
        setloading(true)
        try {
            const data = await getme()
            setuser(data.user)
        } catch (error) {
            setuser(null)
        } finally {
            setloading(false)
        }
    }

    async function handleLogout() {
        setloading(true)
        try {
            await logout()
            setuser(null)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        handleGetme()
    }, [])

    return ({
        user, loading, handleGetme, handleLogin, handleLogout, handleRegister
    })
}