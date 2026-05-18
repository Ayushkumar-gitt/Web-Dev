import React, { useEffect, useState } from 'react'
import MacWindow from './MacWindow'
import Markdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atelierDuneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import './note.scss'

const Note = ({ windowName, setWindowState, isClosing, zIndex, bringToFront }) => {
  const [markdown, setmarkdown] = useState(null)
  useEffect(() => {
    fetch("/note.txt").then(res => res.text()).then(text => setmarkdown(text))
  }, [])

  return (
    <div>
      <MacWindow windowName={windowName} setWindowState={setWindowState} isClosing={isClosing} zIndex={zIndex} bringToFront={bringToFront}>
        <div className="note-window">
          <SyntaxHighlighter style={atelierDuneDark}>{markdown}</SyntaxHighlighter>
        </div>
      </MacWindow>
    </div>
  )
}

export default Note
