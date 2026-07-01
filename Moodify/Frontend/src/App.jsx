import React from 'react'
import FaceExpression from './Features/Expressions/Components/FaceExpression'
import AppRouter from './AppRouter'
import './Features/shared/style/global.scss'
import { AuthProvider } from './Features/auth/auth.context'
import { SongContextProvider } from './Features/Home/song.context'

const App = () => {
  return (
    <AuthProvider>
      <SongContextProvider>
        <AppRouter />
      </SongContextProvider>
    </AuthProvider>
  )
}

export default App
