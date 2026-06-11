import React from 'react'
import AppRouter from './AppRouter'
import "../src/Style.scss"
import { AuthProvider } from './Features/Auth/auth.context.jsx'
import { PostContextProvider } from './Features/Post/post.context.jsx'
const App = () => {
  return (
    <AuthProvider>
      <PostContextProvider>
        <AppRouter />
      </PostContextProvider>
    </AuthProvider>
  )
}

export default App
