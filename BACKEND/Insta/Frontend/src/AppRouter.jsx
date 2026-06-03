import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './Features/Auth/pages/Login'
import Register from './Features/Auth/pages/Register'

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/register' element={<Register />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter
