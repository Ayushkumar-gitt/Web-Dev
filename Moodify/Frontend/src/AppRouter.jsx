import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './Features/auth/pages/Login'
import Register from './Features/auth/pages/Register'
import Protected from './Features/auth/components/Protected'
import Home from './Features/Home/pages/Home'

const AppRouter = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/register' element={<Register />}></Route>
                {/* <Route path='/logout' element></Route> */}
                <Route path='/' element={<Protected children={<Home/>}/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter
