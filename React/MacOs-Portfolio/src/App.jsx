import React, { useState } from 'react'
import './app.scss'
import Dock from './components/Dock'
import Nav from './components/Nav'
import MacWindow from './windows/MacWindow'
import Github from './windows/Github'
import Note from './windows/Note'
import ResumeViewer from './windows/ResumeViewer'
import Spotify from './windows/Spotify'
import TerminalWindow from './windows/TerminalWindow'
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs'

const App = () => {
  const [windowState, setwindowState] = useState({
    github: false,
    note: false,
    resume: false,
    spotify: false,
    terminal: false
  })

  return (
    <main>
      {windowState && <Nav />}
      <Dock windowState={windowState} setWindowState={setwindowState} />
      {windowState.github && <Github windowName="GitHub" setWindowState={setwindowState} />}
      {windowState.note && <Note windowName="Note" setWindowState={setwindowState} />}
      {windowState.resume && <ResumeViewer windowName="Resume" setWindowState={setwindowState} />}
      {windowState.spotify && <Spotify windowName="Spotify" setWindowState={setwindowState} />}
      {windowState.terminal && <TerminalWindow windowName="Terminal" setWindowState={setwindowState} />}
    </main>
  )
}

export default App
