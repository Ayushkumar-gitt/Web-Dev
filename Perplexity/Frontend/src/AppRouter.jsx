import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './Features/auth/pages/Login'
import Register from './Features/auth/pages/Register'
import HomePage from './Features/auth/pages/HomePage'
import { useAuth } from './Features/auth/hooks/useAuth'

const AppRouter = () => {
    const auth = useAuth()

    useEffect(() => {
        auth.handleGetMe()
    }, [])
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/register' element={<Register />}></Route>
                <Route path='/homepage' element={<HomePage />}></Route>
            </Routes>
        </BrowserRouter>

    )
}

export default AppRouter
