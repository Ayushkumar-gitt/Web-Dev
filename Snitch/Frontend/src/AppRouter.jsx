import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Register from './features/auth/pages/Register'
import Login from './features/auth/pages/Login'
import CreateProduct from './features/products/pages/createProduct'
import Dashboard from './features/products/pages/Dashboard.jsx'
import { useAuth } from './features/auth/hook/useAuth.js'
import { useSelector } from 'react-redux'
import Protected from './features/auth/components/Protected.jsx'
import Home from './features/products/pages/Home.jsx'

const AppRouter = () => {
    const { getMeHandler } = useAuth()
    const user = useSelector(state => state.auth.user)
    useEffect(() => {
        getMeHandler()
    }, [])
    console.log(user);

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/seller/create' element={<Protected role="seller"><CreateProduct /></Protected>} />
                <Route path='/seller/dashboard' element={<Protected role='seller'><Dashboard /></Protected>} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter