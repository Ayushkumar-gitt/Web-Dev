import React from 'react'
import MacWindow from './MacWindow'
import githubData from '../../src/assets/github.json'
import GithubCard from '../components/GithubCard'
import './github.scss'

const Github = ({ windowName, setWindowState, isClosing, zIndex, bringToFront }) => {
    // console.log(githubData[0]);

    return (
        <MacWindow windowName={windowName} setWindowState={setWindowState} isClosing={isClosing} zIndex={zIndex} bringToFront={bringToFront}>
            <div className='cards'>
                {githubData.map((elem) => {
                    return <GithubCard data={elem} />
                    // console.log(elem);

                })}
            </div>
        </MacWindow>
    )
}

export default Github
