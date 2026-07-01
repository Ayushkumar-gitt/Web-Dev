import { createContext } from "react";
import { useState } from "react";


export const AuthContext = createContext()

export function AuthProvider({ children }) {

    const [user, setuser] = useState(null)
    const [loading, setloading] = useState(true)

    return (
        <AuthContext.Provider value={{ user, loading, setuser, setloading }}>
            {children}
        </AuthContext.Provider>
    )
}