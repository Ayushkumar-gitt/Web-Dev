import React from 'react'
import MacWindow from './MacWindow'
import './note.scss'
const ResumeViewer = ({ windowName, setWindowState }) => {
  return (
    <MacWindow windowName={windowName} setWindowState={setWindowState}>
        <div className="resume-window">
            <iframe src="/Ayush-Kumar-Resume.pdf" frameborder="0"></iframe>
        </div>
    </MacWindow>
  )
}

export default ResumeViewer
