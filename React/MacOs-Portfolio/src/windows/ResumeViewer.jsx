import React from 'react'
import MacWindow from './MacWindow'
import './note.scss'
const ResumeViewer = ({ windowName, setWindowState, isClosing, fullScreen, zIndex, bringToFront }) => {
  return (
    <MacWindow windowName={windowName} setWindowState={setWindowState} isClosing={isClosing} fullScreen={fullScreen} zIndex={zIndex} bringToFront={bringToFront}>
        <div className="resume-window">
            <iframe src="/Ayush-Kumar-Resume.pdf" frameborder="0"></iframe>
        </div>
    </MacWindow>
  )
}

export default ResumeViewer
