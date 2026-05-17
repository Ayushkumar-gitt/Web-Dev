import React from 'react'
import { Rnd } from 'react-rnd'
import './window.scss'
const MacWindow = ({ children, windowName, setWindowState }) => {
    return (
        <Rnd default={{
            width: '40vw',
            height: '40vh',
            x: 300,
            y: 200
        }}
            dragHandleClassName="nav">
            <div className="window">
                <div className="nav">
                    <div className="dots">
                        <div onClick={() => { setWindowState(state => ({ ...state, [windowName.toLowerCase()]: false })) }} className="red"></div>
                        <div className="yellow"></div>
                        <div className="green"></div>
                    </div>
                    <div className="title"><p>{windowName} - Ayush Kumar</p></div>
                </div>
                <div className="maincontent">
                    {children}
                </div>
            </div>
        </Rnd>
    )
}

export default MacWindow
