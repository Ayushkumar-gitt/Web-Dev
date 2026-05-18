import React, { useState } from 'react'
import './nav.scss'
import DateTime from './DateTime'
const Nav = ({ toggleWindow, setIsLocked, setIsShutdown, isLocked }) => {
  const [showAppleMenu, setShowAppleMenu] = useState(false)

  const lockMac = () => {
    setShowAppleMenu(false)
    setIsShutdown(false)
    setIsLocked(true)
  }

  const shutdownMac = () => {
    setShowAppleMenu(false)
    setIsLocked(false)
    setIsShutdown(true)
  }

  const openNavApp = (appName) => {
    if (isLocked) {
      alert('Unlock PC first')
      return
    }

    toggleWindow(appName)
  }

  return (
    <nav>
        <div className="left">
            <div className="apple-logo" onClick={() => setShowAppleMenu(state => !state)}>
                <img src="/navbar-icons/apple.svg" alt="" />
                {showAppleMenu && (
                    <div className="apple-menu" onClick={(event) => event.stopPropagation()}>
                        <button onClick={shutdownMac}>Shutdown</button>
                        <button onClick={lockMac}>Lock</button>
                    </div>
                )}
            </div>
            <div className="nav-item" onClick={() => openNavApp('github')}>
                <p>Ayush kumar</p>
            </div>
            <div className="nav-item" onClick={() => openNavApp('note')}>
                <p>File</p>
            </div>
            <div className="nav-item" onClick={() => openNavApp('resume')}>
                <p>Window</p>
            </div>
            <div className="nav-item" onClick={() => openNavApp('terminal')}>
                <p>Terminal</p>
            </div>
        </div>
        <div className="right">
            {!isLocked && <div className="nav-icon">
                <img src="/navbar-icons/wifi.svg" alt="" />
            </div>}
            <DateTime/> 
        </div>
    </nav>
  )
}

export default Nav
