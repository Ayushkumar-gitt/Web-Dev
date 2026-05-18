import React, { useState } from 'react'
import './app.scss'
import Dock from './components/Dock'
import Nav from './components/Nav'
import LockScreen from './components/LockScreen'
import Github from './windows/Github'
import Note from './windows/Note'
import ResumeViewer from './windows/ResumeViewer'
import Spotify from './windows/Spotify'
import TerminalWindow from './windows/TerminalWindow'

const App = () => {
  const [, setNextZIndex] = useState(100)
  const [windowZIndex, setWindowZIndex] = useState({
    github: 100,
    note: 100,
    resume: 100,
    spotify: 100,
    terminal: 100
  })
  const [windowState, setwindowState] = useState({
    github: false,
    note: false,
    resume: false,
    spotify: false,
    terminal: false
  })
  const [isLocked, setIsLocked] = useState(false)
  const [isShutdown, setIsShutdown] = useState(false)

  const bringToFront = (appName) => {
    setNextZIndex(currentZIndex => {
      const newZIndex = currentZIndex + 1
      setWindowZIndex(state => ({
        ...state,
        [appName]: newZIndex
      }))
      return newZIndex
    })
  }

  const toggleWindow = (appName) => {
    if (windowState[appName] !== true) {
      bringToFront(appName)
    }

    setwindowState(state => ({
      ...state,
      [appName]: state[appName] === true ? 'closing' : true
    }))
  }

  return (
    <main>
      {windowState && <Nav toggleWindow={toggleWindow} setIsLocked={setIsLocked} setIsShutdown={setIsShutdown} isLocked={isLocked || isShutdown} />}
      {!(isLocked || isShutdown) && <Dock toggleWindow={toggleWindow} />}
      {windowState.github && <Github windowName="GitHub" setWindowState={setwindowState} isClosing={windowState.github === 'closing'} zIndex={windowZIndex.github} bringToFront={bringToFront} />}
      {windowState.note && <Note windowName="Note" setWindowState={setwindowState} isClosing={windowState.note === 'closing'} zIndex={windowZIndex.note} bringToFront={bringToFront} />}
      {windowState.resume && <ResumeViewer windowName="Resume" setWindowState={setwindowState} isClosing={windowState.resume === 'closing'} zIndex={windowZIndex.resume} bringToFront={bringToFront} fullScreen />}
      {windowState.spotify && <Spotify windowName="Spotify" setWindowState={setwindowState} isClosing={windowState.spotify === 'closing'} zIndex={windowZIndex.spotify} bringToFront={bringToFront} fullScreen />}
      {windowState.terminal && <TerminalWindow windowName="Terminal" setWindowState={setwindowState} isClosing={windowState.terminal === 'closing'} zIndex={windowZIndex.terminal} bringToFront={bringToFront} />}
      {(isLocked || isShutdown) && <LockScreen isShutdown={isShutdown} setIsLocked={setIsLocked} setIsShutdown={setIsShutdown} />}
    </main>
  )
}

export default App
