import React from 'react'
import AppRouter from './AppRouter'
import "../src/style.scss"
import { AuthProvider } from './Features/Auth/auth.context.jsx'
const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

export default App
