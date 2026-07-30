import { login, register } from "../services/auth.service";
import { useDispatch } from 'react-redux'
import { setUser } from "../state/auth.slice";

export function useAuth() {

    const dispatch = useDispatch()

    async function registerHandler({ email, password, fullname, contact, isSeller = false }) {
        const data = await register({ email, password, fullname, contact, isSeller })
        dispatch(setUser(data.user))
    }

    async function loginHandler({ email, password }) {
        const data = await login({ email, password })
        dispatch(setUser(data.user))
    }

    return { registerHandler, loginHandler }
}