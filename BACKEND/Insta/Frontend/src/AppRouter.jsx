import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './Features/Auth/pages/Login'
import Register from './Features/Auth/pages/Register'
import Feed from './Features/Post/pages/Feed'
import CreatePost from './Features/Post/CreatePost'

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Feed/>}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/register' element={<Register />}></Route>
                <Route path='/createpost' element={<CreatePost />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter
