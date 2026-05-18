import React, { useEffect, useState } from 'react'
import { Rnd } from 'react-rnd'
import './window.scss'
const MacWindow = ({ children, windowName, setWindowState, isClosing, fullScreen, zIndex, bringToFront }) => {
    const appName = windowName.toLowerCase()
    const navHeight = 28
    const windowXPositions = {
        github: 220,
        note: 300,
        terminal: 380
    }
    const defaultWindow = { width: '40vw', height: '40vh', x: windowXPositions[appName] ?? 300, y: 200 }
    const fullscreenWindow = { width: '100vw', height: `calc(100vh - ${navHeight}px)`, x: 0, y: navHeight }
    const [isFullScreen, setIsFullScreen] = useState(Boolean(fullScreen))
    const [isFullScreenAnimating, setIsFullScreenAnimating] = useState(false)
    const [normalWindow, setNormalWindow] = useState(defaultWindow)

    useEffect(() => {
        if (!isClosing) return

        const closeTimer = setTimeout(() => {
            setWindowState(state => ({ ...state, [appName]: false }))
        }, 260)

        return () => clearTimeout(closeTimer)
    }, [appName, isClosing, setWindowState])

    const closeWindow = () => {
        setWindowState(state => ({ ...state, [appName]: 'closing' }))
    }

    const minimiseWindow = () => {
        setWindowState(state => ({ ...state, [appName]: 'closing' }))
    }

    const toggleFullScreen = () => {
        setIsFullScreenAnimating(true)
        setIsFullScreen(state => !state)
        setTimeout(() => {
            setIsFullScreenAnimating(false)
        }, 320)
    }

    const activeWindow = isFullScreen ? fullscreenWindow : normalWindow

    return (
        <Rnd size={{ width: activeWindow.width, height: activeWindow.height }}
            position={{ x: activeWindow.x, y: activeWindow.y }}
            className={`${isFullScreen ? 'fullscreen-rnd' : ''} ${isFullScreenAnimating ? 'fullscreen-animating' : ''}`}
            style={{ zIndex }}
            disableDragging={isFullScreen}
            enableResizing={!isFullScreen}
            onMouseDown={() => bringToFront(appName)}
            onDragStop={(_event, data) => {
                setNormalWindow(state => ({ ...state, x: data.x, y: data.y }))
            }}
            onResizeStop={(_event, _direction, ref, _delta, position) => {
                setNormalWindow({
                    width: ref.style.width,
                    height: ref.style.height,
                    x: position.x,
                    y: position.y
                })
            }}
            dragHandleClassName="nav">
            <div className={`window-animation ${isClosing ? 'window-closing' : ''}`}>
                <div className="window">
                    <div className="nav">
                        <div className="dots">
                            <div onClick={closeWindow} className="red"></div>
                            <div onClick={toggleFullScreen} className="yellow"></div>
                            <div onClick={minimiseWindow} className="green"></div>
                        </div>
                        <div className="title"><p>{windowName} - Ayush Kumar</p></div>
                    </div>
                    <div className="maincontent">
                        {children}
                    </div>
                </div>
            </div>
        </Rnd>
    )
}

export default MacWindow
