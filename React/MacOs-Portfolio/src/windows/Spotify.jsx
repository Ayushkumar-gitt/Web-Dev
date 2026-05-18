import React from 'react'
import MacWindow from './MacWindow'
import './note.scss'
const Spotify = ({ windowName, setWindowState, isClosing, fullScreen, zIndex, bringToFront }) => {
  return (
    <MacWindow windowName={windowName} setWindowState={setWindowState} isClosing={isClosing} fullScreen={fullScreen} zIndex={zIndex} bringToFront={bringToFront}>
        <div className="spotify">
            <iframe data-testid="embed-iframe" style={{borderradius:"12px"}} src="https://open.spotify.com/embed/playlist/37i9dQZEVXbMWDif5SCBJq?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </div>
    </MacWindow>
  )
}

export default Spotify
